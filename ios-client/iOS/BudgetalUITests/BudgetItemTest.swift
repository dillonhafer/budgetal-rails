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
    SignInScene().signInWith(user)

    tap_on("Charity Category")
    tap_on("Add Budget Item")

    fill_in("Name", with: "My Charity")
    fill_in("Budgeted", with: "200")

    tap_on("Save")
    tap_on("Back Button")

    SignInScene().signOut()
  }
}
