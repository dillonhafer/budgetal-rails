//
//  BudgetalUITests.swift
//  BudgetalUITests
//
//  Created by Dillon Hafer on 6/28/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

class BudgetalUITests: XCTestCase {
    override func setUp() {
      super.setUp()
      continueAfterFailure = false
      let app = XCUIApplication()
      app.launchArguments = ["http://localhost:3388", "TESTING"]
      app.launch()
    }
    
    override func tearDown() {
      super.tearDown()
    }
    
    func testSignIn() {
      let page = SignInPage()
      let user = User(email: "dh@dillonhafer.com", password: "password")

      page.signInWith(user)
    }
}
