//
//  TestExtensions.swift
//  Budgetal
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