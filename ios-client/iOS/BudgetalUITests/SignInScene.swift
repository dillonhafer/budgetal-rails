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

class SignInScene : XCTestCase {
  func signInWith(user: User) {
    fill_in("Email", with: user.email!)
    fill_in("Password", with: user.password!, secure: true)
    tap_on("Sign In")

    accept_alert("Welcome Back")

    XCTAssert(XCUIApplication().staticTexts["Budgets"].exists)
  }

  func signOut() {
    tap_on("Menu")
    tap_on("Sign Out")

    accept_alert("Signed Out")
  }
}
