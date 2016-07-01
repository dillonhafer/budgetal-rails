//
//  BudgetItemScene.swift
//  Budgetal
//
//  Created by Dillon Hafer on 7/1/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest

struct BudgetItem {
  var name: String?
  var budgeted: String?
}

class BudgetItemScene : XCTestCase {
  func addBudgetItem(budgetItem: BudgetItem) {    
    tap_on("Add Budget Item")

    fill_in("Name", with: budgetItem.name!)
    fill_in("Budgeted", with: budgetItem.budgeted!)

    tap_on("Save")

//    XCTAssert(XCUIApplication().staticTexts[budgetItem.name!].exists)
  }
}
