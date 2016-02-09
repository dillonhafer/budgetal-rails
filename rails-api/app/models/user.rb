class User < ActiveRecord::Base
  has_many :annual_budgets, dependent: :destroy
  has_many :annual_budget_items, through: :annual_budgets
  has_many :budgets, dependent: :destroy
  has_many :budget_categories, through: :budgets
  has_many :budget_items, through: :budget_categories
  has_many :budget_item_expenses, through: :budget_items
  has_many :allocation_plans, through: :budgets
  has_many :allocation_plan_budget_items, through: :allocation_plans
  has_many :sessions, dependent: :destroy

  devise :database_authenticatable, :registerable, :timeoutable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :first_name, :last_name
  validates_presence_of :password, on: :create
  validates_confirmation_of :password, on: :create
  validates :email, presence: true, uniqueness: true, case_sensitive: false

  has_attached_file :avatar, styles: { thumb: "300x300#" }, default_url: "/images/missing-profile.png"

  validates_attachment :avatar,
    content_type: { content_type: /\Aimage\/.*\Z/ },
    size: { in: 0..1.megabytes }

  after_create :send_welcome_email

  def full_name
    "#{first_name} #{last_name}"
  end

  def past_expenses(name)
    budget_item_expenses.where("budget_item_expenses.name ilike ?", "#{name}%")
                        .distinct('name')
                        .reorder('budget_item_expenses.name')
                        .pluck('budget_item_expenses.name')
  end

  def expire_previous_sessions(keep:, time: Time.now)
    sessions.active.where(user_agent: keep.user_agent)
            .where('authentication_key <> ?', keep.authentication_key)
            .update_all(expired_at: time)
  end

  def expire_session(authentication_key:, time: Time.now)
    sessions.active.find(authentication_key).update_attributes(expired_at: time)
  end

  def data_avatar
    path = avatar.path(:thumb) || File.join(Rails.root, 'public', 'images', 'missing-profile.png')
    encoded_avatar = File.open(path) { |f| Base64.encode64(f.read) }
    "data:#{avatar.content_type};base64,#{encoded_avatar}"
  end

  private

  def send_welcome_email
    Notifier.new_user(self).deliver_now
  end
end
