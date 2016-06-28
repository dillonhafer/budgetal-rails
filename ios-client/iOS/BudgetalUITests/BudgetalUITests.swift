//
//  BudgetalUITests.swift
//  BudgetalUITests
//
//  Created by Dillon Hafer on 6/28/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

extension XCUIElement {
  /**
   Removes any current text in the field before typing in the new value
   - Parameter text: the text to enter into the field
   */
  func clearAndEnterText(text: String) -> Void {
    guard let stringValue = self.value as? String else {
      XCTFail("Tried to clear and enter text into a non string value")
      return
    }

    self.tap()

    var deleteString: String = ""
    for _ in stringValue.characters {
      deleteString += "\u{8}"
    }
    
    self.typeText(deleteString)

    self.typeText(text)
  }
}

struct User {
  var email: String?
  var password: String?
}

class SignInPage {
  func signInWith(user: User) {
    let app = XCUIApplication()
    let emailField = app.textFields["Email"]
    let passwordField = app.secureTextFields["Password"]

    emailField.clearAndEnterText("")
    emailField.typeText(user.email!)

    passwordField.tap()
    passwordField.typeText(user.password!)

    app.otherElements["Sign In"].tap()
    app.alerts["Welcome Back"].collectionViews.buttons["OK"].tap()
  }
}

class BudgetalUITests: XCTestCase {
    override func setUp() {
      super.setUp()
      continueAfterFailure = false
      XCUIApplication().launch()
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
