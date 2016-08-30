//
//  BudgetalUITests.swift
//  BudgetalUITests
//
//  Created by Dillon Hafer on 6/28/16.
//

import XCTest

class BudgetItemTest: XCTestCase {
  var user = User(email: "dh@dillonhafer.com", password: "password")

  override func setUp() {
    super.setUp()
    let testData: [[String: AnyObject]] = [
      [
        "factory": "user",
        "options": [
          "email": user.email!,
          "password": user.password!
        ]
      ]
    ]

    TestHelper().setup(testData)
    TestHelper().launchInTestEnvironment()
  }

  override func tearDown() {
    TestHelper().reset()
    super.tearDown()
  }

  func testAddBudgetItem() {
    let budgetItem = BudgetItem(name: "My Charity", budgeted: "200")

    SignInScene().signInWith(user)

    tap_on("Charity Category")

    BudgetItemScene().addBudgetItem(budgetItem)
  }
}
