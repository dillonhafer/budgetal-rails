class User < ActiveRecord::Base
  has_many :budgets
  attr_accessible :email, :password, :password_confirmation
  attr_accessor :password
  
  before_save :encrypt_password 
  before_validation :downcase_email

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates :password, :length => {:minimum => 6}, :on => :create

  EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  validates :email, :presence => true, :uniqueness => true
  validates :email, :presence => true, :format => {:with => EMAIL_REGEX}

  def send_password_reset
    generate_token(:password_reset_token)
    self.password_reset_sent_at = Time.zone.now
    save!
    Notifier.password_reset(self).deliver
  end

  def send_welcome_email
    Notifier.new_user(self).deliver
  end

  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end

  def self.authenticate(email, password)
    user = find_by_email(email)
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end
  
  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end

  def downcase_email
    self.email = self.email.downcase
  end

  def admin?
    if admin == true
      return true
    else
      return false
    end
  end

  def create_initial_budgets
    counter = 1
    12.times do
      b = Budget.create(:monthly_income => '0000.00')
      b.month = counter
      b.user_id = self.id
      b.save
      counter += 1
    end

    budgets = Budget.where user_id: self.id
    budgets.each do |b|
      a = BudgetCategory.create(budget_id: b.id, name: 'Charity', percentage: '10-15%')
      BudgetItem.create(budget_category_id: a.id, amount_budgeted: 0.00, name: 'Tithes')

      bb = BudgetCategory.create(budget_id: b.id, name: 'Saving', percentage: '10-15%')
      BudgetItem.create(budget_category_id: bb.id, amount_budgeted: 0.00, name: 'Emergency Fund')

      c = BudgetCategory.create(budget_id: b.id, name: 'Housing', percentage: '25-35%')
      BudgetItem.create(budget_category_id: c.id, amount_budgeted: 0.00, name: 'Rent')

      d = BudgetCategory.create(budget_id: b.id, name: 'Utilities', percentage: '5-10%')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Electricity')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Gas')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Water')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Trash')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Phone')
      BudgetItem.create(budget_category_id: d.id, amount_budgeted: 0.00, name: 'Internet')

      e = BudgetCategory.create(budget_id: b.id, name: 'Food', percentage: '5-15%')
      BudgetItem.create(budget_category_id: e.id, amount_budgeted: 0.00, name: 'Groceries', envelope: true)
      BudgetItem.create(budget_category_id: e.id, amount_budgeted: 0.00, name: 'Restaurants', envelope: true)

      f = BudgetCategory.create(budget_id: b.id, name: 'Clothing', percentage: '2-7%')
      BudgetItem.create(budget_category_id: f.id, amount_budgeted: 0.00, name: 'Adults', envelope: true)
      BudgetItem.create(budget_category_id: f.id, amount_budgeted: 0.00, name: 'Cleaning/Laundry', envelope: true)

      g = BudgetCategory.create(budget_id: b.id, name: 'Transportation', percentage: '10-15%')
      BudgetItem.create(budget_category_id: g.id, amount_budgeted: 0.00, name: 'Gas')
      BudgetItem.create(budget_category_id: g.id, amount_budgeted: 0.00, name: 'Repairs & Tires', envelope: true)

      h = BudgetCategory.create(budget_id: b.id, name: 'Medical/Health', percentage: '5-10%')
      BudgetItem.create(budget_category_id: h.id, amount_budgeted: 0.00, name: 'Vitamins')

      i = BudgetCategory.create(budget_id: b.id, name: 'Insurance', percentage: '10-25%')
      BudgetItem.create(budget_category_id: i.id, amount_budgeted: 0.00, name: 'Auto')
      BudgetItem.create(budget_category_id: i.id, amount_budgeted: 0.00, name: 'Renters')

      j = BudgetCategory.create(budget_id: b.id, name: 'Personal', percentage: '5-10%')
      BudgetItem.create(budget_category_id: j.id, amount_budgeted: 0.00, name: 'Toiletries', envelope: true)
      BudgetItem.create(budget_category_id: j.id, amount_budgeted: 0.00, name: 'Pocket Money', envelope: true)

      k = BudgetCategory.create(budget_id: b.id, name: 'Recreation', percentage: '5-10%')
      BudgetItem.create(budget_category_id: k.id, amount_budgeted: 0.00, name: 'Entertainment', envelope: true)

      l = BudgetCategory.create(budget_id: b.id, name: 'Debts', percentage: '0%')
      BudgetItem.create(budget_category_id: l.id, amount_budgeted: 0.00, name: 'Credit Card')

    end
  end
end