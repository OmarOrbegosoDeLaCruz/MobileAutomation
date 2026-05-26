const BasePage = require('../BasePage');
const AdbHelper = require('../../Helpers/AdbHelper');

class SettingsPage extends BasePage {
  get appsMenuSelectors() {
    return [
      'android=new UiSelector().text("Apps")',
      'android=new UiSelector().text("Apps & notifications")',
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Apps")',
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Apps & notifications")',
    ];
  }

  get appsScreenSelectors() {
    return [
      'android=new UiSelector().text("Apps")',
      'android=new UiSelector().text("Apps & notifications")',
      'android=new UiSelector().text("Recently opened apps")',
      'android=new UiSelector().text("See all apps")',
      'android=new UiSelector().text("Default apps")',
    ];
  }

  get appsScreenContentSelectors() {
    return [
      'android=new UiSelector().text("Recently opened apps")',
      'android=new UiSelector().text("See all apps")',
      'android=new UiSelector().text("Default apps")',
    ];
  }

  async openAppsSettings() {
    console.log('Opening Apps settings...');
    const alreadyOnAppsSettings = await this.isAppsSettingsVisible();

    if (alreadyOnAppsSettings) {
      console.log('Apps settings is already open.');
      return;
    }

    await this.clickFirstDisplayed(this.appsMenuSelectors);
    await this.waitForAppsSettings();
  }

  async waitForAppsSettings(timeout = 10000) {
    await this.waitForFirstDisplayed(this.appsScreenSelectors, timeout);
  }

  async isAppsSettingsVisible(timeout = 2000) {
    return this.waitForFirstDisplayed(this.appsScreenContentSelectors, timeout)
      .then(() => true)
      .catch(() => false);
  }

  async bringToForeground() {
    await AdbHelper.launchSettings();
    await this.driver.pause(1000);
  }

  async verifyAppsSettingsRecovered() {
    console.log('Checking that Apps settings recovered...');
    await this.bringToForeground();

    try {
      await this.waitForAppsSettings(5000).catch(async () => {
        console.log('Settings opened, but Apps screen is not visible yet. Reopening Apps settings...');
        await this.openAppsSettings();
        await this.waitForAppsSettings();
      });
    } catch (error) {
      console.log('Current Android page source:');
      console.log(await this.driver.getPageSource());
      throw error;
    }

    console.log('Apps settings recovered successfully.');
  }
}

module.exports = SettingsPage;
