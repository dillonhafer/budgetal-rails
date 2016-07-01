//
//  BudgetalUITests.swift
//  BudgetalUITests
//
//  Created by Dillon Hafer on 6/28/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

class BudgetItemTest: XCTestCase {
  override func setUp() {
    super.setUp()
    TestHelper().setup((self.invocation?.selector.description)!)
    TestHelper().launchInTestEnvironment()
  }

  override func tearDown() {
    TestHelper().reset()
    super.tearDown()
  }

  func testAddBudgetItem() {
    let user = User(email: "dh@dillonhafer.com", password: "password")
    let budgetItem = BudgetItem(name: "My Charity", budgeted: "200")

    SignInScene().signInWith(user)

    tap_on("Charity Category")

    BudgetItemScene().addBudgetItem(budgetItem)

    tap_on("Back Button")
    
    SignInScene().signOut()
  }
}
