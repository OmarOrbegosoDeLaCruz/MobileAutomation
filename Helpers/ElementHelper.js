class ElementHelper {
  static async waitForFirstDisplayed(driver, selectors, timeout = 10000) {
    const endTime = Date.now() + timeout;
    let lastError;

    while (Date.now() < endTime) {
      for (const selector of selectors) {
        let elements;

        try {
          elements = await driver.$$(selector);
        } catch (error) {
          lastError = error;
          continue;
        }

        for (const element of elements) {
          if (await element.isDisplayed().catch(() => false)) {
            return element;
          }
        }
      }

      await driver.pause(500);
    }

    if (lastError) {
      console.warn(`Last element lookup error before timeout: ${lastError.message}`);
    }

    throw new Error(`Could not find any visible element matching: ${selectors.join(', ')}`);
  }

  static async clickFirstDisplayed(driver, selectors, timeout = 10000) {
    const element = await ElementHelper.waitForFirstDisplayed(driver, selectors, timeout);
    await element.click();
  }
}

module.exports = ElementHelper;
