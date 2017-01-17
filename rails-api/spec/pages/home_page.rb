class HomePage < PageObject
  def visit_page
    visit root_path
  end

  def on_page?
    has_selector? '.slider-text h2', text: 'Budgetal'
  end

  def sign_out
    visit_page
    page.execute_script "localStorage.clear()"
  end
end
