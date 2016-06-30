//
//  TestHelper.swift
//  Budgetal
//
//  Created by Dillon Hafer on 6/29/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import XCTest

class TestHelper : XCTestCase {
  private func request(type: String) {
    let urlPath: String = "http://localhost:3389/tests/\(type)"
    let url: NSURL = NSURL(string: urlPath)!
    let request1: NSURLRequest = NSURLRequest(URL: url)
    let response: AutoreleasingUnsafeMutablePointer<NSURLResponse?>=nil


    do {
      let dataVal = try NSURLConnection.sendSynchronousRequest(request1, returningResponse: response)
      print(response)

      do {
        if let jsonResult = try NSJSONSerialization.JSONObjectWithData(dataVal, options: []) as? NSDictionary {
          print("Synchronous\(jsonResult)")
        }
      } catch let error as NSError {
        print(error.localizedDescription)
      }
    } catch let error as NSError {
      print(error.localizedDescription)
    }
  }

  func clickAlert(text:String, button:String = "OK") {
    let alert = XCUIApplication().alerts[text]
    let exists = NSPredicate(format: "exists == true")
    expectationForPredicate(exists, evaluatedWithObject: alert, handler: nil)
    waitForExpectationsWithTimeout(5, handler: nil)
    alert.collectionViews.buttons[button].tap()
  }

  func setup(test: String) {
    request("setup?test=\(test)")
  }

  func teardown(test: String) {
    request("teardown?test=\(test)")
  }

  func reset() {
    request("reset")
  }
}