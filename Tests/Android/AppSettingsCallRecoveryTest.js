const AppSettingsCallRecoveryHelper = require('../../Helpers/AppSettingsCallRecoveryHelper');
const AdbHelper = require('../../Helpers/AdbHelper');
const DriverHelper = require('../../Helpers/DriverHelper');
const SettingsPage = require('../../Pages/Android/SettingsPage');

describe('App Settings call recovery', () => {
  let settingsPage;
  let callRecovery;

  beforeEach(async () => {
    settingsPage = new SettingsPage(browser);
    callRecovery = new AppSettingsCallRecoveryHelper(browser);
    await browser.updateSettings({
      enforceXPath1: true,
      waitForIdleTimeout: 0,
    });
    await AdbHelper.resetDeviceSurface();
    await settingsPage.bringToForeground();
  });

  afterEach(async () => {
    await callRecovery.cleanUpCallState();
  });

  after(async () => {
    await DriverHelper.holdFinalState(browser);
  });

  it('recovers after dismissing an incoming call', async () => {
    await settingsPage.openAppsSettings();
    await callRecovery.simulateIncomingCall();
    await callRecovery.dismissIncomingCall();
    await settingsPage.verifyAppsSettingsRecovered();
  });

  it('recovers after answering and hanging up an incoming call', async () => {
    await settingsPage.openAppsSettings();
    await callRecovery.simulateIncomingCall();
    await callRecovery.answerIncomingCall();
    await callRecovery.hangUpActiveCall();
    await settingsPage.verifyAppsSettingsRecovered();
  });
});
