//
//  SignInScene.swift
//  Budgetal
//
//  Created by Dillon Hafer on 6/28/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

struct User {
  var email: String?
  var password: String?
}

class SignInScene {
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

  func signOut() {
    let app = XCUIApplication()
    app.otherElements["Menu"].tap()
    app.otherElements["Sign Out"].tap()
    sleep(1)
    app.alerts["Signed Out"].collectionViews.buttons["OK"].tap()
  }
}