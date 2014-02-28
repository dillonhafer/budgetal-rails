class User < ActiveRecord::Base  
  has_many :budgets

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :first_name, :last_name
  validates_presence_of :password, on: :create
  validates_confirmation_of :password, on: :create
  validates :email, :presence => true, :uniqueness => true, :case_sensitive => false
  
  after_create :send_welcome_email
  
  def self.current
    Thread.current[:user]
  end  

  def full_name
    "#{first_name} #{last_name}"
  end

  def admin?
    admin
  end
  
  def make_admin
    self.admin = true    
    self.save
  end  
  
  def remove_admin
    self.admin = false
    self.save
  end

  private

  def send_welcome_email
    Notifier.new_user(self).deliver
  end
end
