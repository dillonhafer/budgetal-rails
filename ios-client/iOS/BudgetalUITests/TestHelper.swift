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
  private func request(type: String, params: NSData? = nil) {
    let urlPath: String = "http://localhost:3389/tests/\(type)"
    
    let request = NSMutableURLRequest(URL: NSURL(string: urlPath)!)
    let session = NSURLSession.sharedSession()
    request.HTTPMethod = "POST"

    if ((params) != nil) {
      request.HTTPBody = params
    }

    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    request.addValue("application/json", forHTTPHeaderField: "Accept")

    let task = session.dataTaskWithRequest(request, completionHandler: {data, response, error -> Void in
      print("Response: \(response)")})

    task.resume()
  }

  func launchInTestEnvironment() {
    continueAfterFailure = false
    let app = XCUIApplication()
    app.launchEnvironment = ["INTEGRATION_TEST_MODE": "TRUE"]
    app.launch()
  }

  func setup(json: [[String: AnyObject]]) {
    let data = ["data": json]
    let serializedJson = try? NSJSONSerialization.dataWithJSONObject(data, options: [])
    request("setup", params: serializedJson!)
  }

  func teardown(test: String) {
    request("teardown?test=\(test)")
  }

  func reset() {
    request("reset")
  }
}