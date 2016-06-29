require 'rails_helper'
require 'support/feature_helper'

feature 'Teapot' do
  it 'is a teapot' do
    visit '/teapot'
    expect(JSON.parse(page.driver.response.body)).to eq "isTeapot" => true
    expect(page.driver.response.status).to eq 418
  end
end
