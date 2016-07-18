require 'rails_helper'
require 'support/feature_helper'

feature "User's session expired", js: true do
  before(:each) do
    user = login
    visit root_path
    click_on "Budgets"
    sleep 0.3
    user.sessions.expire
  end

  it 'gets redirected on Categories' do
    within('.icon-bar') do
      click_on 'Saving'
    end
    assert_redirected
  end

  it 'gets redirected on Update Budget' do
    click_on 'Save Income'
    assert_redirected
  end

  it 'gets redirected on Detailed Budgets' do
    click_on 'Detailed Budgets'
    assert_redirected
  end

  it 'gets redirected on Annual Budgets' do
    click_on 'Annual Budgets'
    assert_redirected
  end
end
