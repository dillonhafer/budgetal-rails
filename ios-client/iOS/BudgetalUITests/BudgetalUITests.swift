//
//  BudgetalUITests.swift
//  BudgetalUITests
//
//  Created by Dillon Hafer on 6/28/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

class SignInTest: XCTestCase {
    override func setUp() {
      super.setUp()
      TestHelper().setup((self.invocation?.selector.description)!)
      continueAfterFailure = false
      let app = XCUIApplication()
      app.launchEnvironment = ["INTEGRATION_TEST_MODE": "TRUE"]
      app.launch()
    }

    override func tearDown() {
      TestHelper().reset()
      super.tearDown()
    }
    
    func testSignIn() {
      let user = User(email: "dh@dillonhafer.com", password: "password")
      SignInScene().signInWith(user)
      XCTAssert(XCUIApplication().staticTexts["Budgets"].exists)
      SignInScene().signOut()
    }
}
