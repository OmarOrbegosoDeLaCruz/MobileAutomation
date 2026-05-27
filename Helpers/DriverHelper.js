const {remote} = require('webdriverio');
const {buildAndroidOptions} = require('../Config/AndroidConfig');

class DriverHelper {
  static async createAndroidDriver() {
    return remote(buildAndroidOptions());
  }

  static async closeSession(driver) {
    if (!driver) {
      return;
    }

    console.log('Closing the Appium session...');
    await driver.deleteSession();
  }

  static async holdFinalState(driver, timeout = 5000) {
    if (process.env.CI) {
      return;
    }

    console.log('Holding the session so you can see the final state...');
    await driver.pause(timeout);
  }
}

module.exports = DriverHelper;
