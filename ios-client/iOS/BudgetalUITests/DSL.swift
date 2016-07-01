//
//  DSL.swift
//  Budgetal
//
//  Created by Dillon Hafer on 7/1/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

func fill_in(text:String, with:String, secure:Bool = false) {
  let app = XCUIApplication()
  var field = app.textFields
  if secure {
    field = app.secureTextFields
  }

  field[text].clearAndEnterText(with)
}

func tap_on(label:String) {
  let app = XCUIApplication()
  app.otherElements[label].tap()
}

func accept_alert(label:String, button:String = "OK") {
  let alert = XCUIApplication().alerts[label]
  let exists = NSPredicate(format: "exists == true")
  let test = XCTestCase()
  test.expectationForPredicate(exists, evaluatedWithObject: alert, handler: nil)
  test.waitForExpectationsWithTimeout(5, handler: nil)
  alert.collectionViews.buttons[button].tap()
}
