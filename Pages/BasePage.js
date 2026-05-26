const ElementHelper = require('../Helpers/ElementHelper');

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async clickFirstDisplayed(selectors, timeout) {
    await ElementHelper.clickFirstDisplayed(this.driver, selectors, timeout);
  }

  async waitForFirstDisplayed(selectors, timeout) {
    return ElementHelper.waitForFirstDisplayed(this.driver, selectors, timeout);
  }
}

module.exports = BasePage;
