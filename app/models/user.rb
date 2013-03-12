class User < ActiveRecord::Base
  has_many :budgets
  attr_accessible :email, :password, :password_confirmation
  attr_accessor :password
  
  before_save :encrypt_password  

  validates_confirmation_of :password
  validates_presence_of :password, :on => :create
  validates :password, :length => {:minimum => 6}, :on => :create

  EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  validates :email, :presence => true, :uniqueness => true
  validates :email, :presence => true, :format => {:with => EMAIL_REGEX}


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

  def admin?
    if admin == true
      return true
    else
      return false
    end
  end
end