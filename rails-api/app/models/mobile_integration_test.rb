class MobileIntegrationTest
  ALLOWED_METHODS = %w(testSignIn testAddBudgetItem)

  def self.setup(test)
    if ALLOWED_METHODS.include? test
      new.send("setup_#{test}")
    end
  end

  def self.teardown(test)
    if ALLOWED_METHODS.include? test
      new.send("teardown_#{test}")
    end
  end

  def self.reset
    DatabaseCleaner.clean_with(:truncation)
  end

  private

  def setup_testSignIn
    FactoryGirl.create(:user, email: 'dh@dillonhafer.com', password: 'password')
  end

  def setup_testAddBudgetItem
    FactoryGirl.create(:user, email: 'dh@dillonhafer.com', password: 'password')
  end
end
