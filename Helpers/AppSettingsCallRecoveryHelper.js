const AdbHelper = require('./AdbHelper');
const IncomingCallPage = require('../Pages/Android/IncomingCallPage');

class AppSettingsCallRecoveryHelper {
  constructor(driver, phoneNumber = process.env.TEST_CALL_NUMBER || AppSettingsCallRecoveryHelper.createPhoneNumber()) {
    this.driver = driver;
    this.phoneNumber = phoneNumber;
    this.incomingCallPage = new IncomingCallPage(driver);
    this.hasActiveCall = false;
  }

  static createPhoneNumber() {
    return `555${Date.now().toString().slice(-4)}`;
  }

  async simulateIncomingCall() {
    await this.cleanUpCallState({resetSurface: false});
    await this.driver.pause(500);
    await AdbHelper.simulateIncomingCall(this.phoneNumber);
    this.hasActiveCall = true;
    await this.driver.pause(1000);
  }

  async answerIncomingCall() {
    console.log('Answering incoming call...');
    await this.driver.pause(1500);

    try {
      await this.incomingCallPage.answerIfVisible(3000);
    } catch (error) {
      console.log('Answer button was not found, accepting the emulator call directly...');
    }

    try {
      await AdbHelper.acceptEmulatorCall(this.phoneNumber);
    } catch (adbError) {
      console.log('Emulator accept command failed, using Android CALL key event...');
      await AdbHelper.run(['shell', 'input', 'keyevent', 'KEYCODE_CALL']);
    }

    this.hasActiveCall = true;
    await this.driver.pause(2000);
  }

  async dismissIncomingCall() {
    console.log('Dismissing incoming call...');

    try {
      await this.incomingCallPage.dismissIfVisible();
    } catch (error) {
      console.log('Call UI button was not found, using Android END_CALL key event...');
      await AdbHelper.endCall();
    } finally {
      await AdbHelper.cancelEmulatorCall(this.phoneNumber);
      this.hasActiveCall = false;
    }
  }

  async hangUpActiveCall() {
    await AdbHelper.endCall();
    await AdbHelper.cancelEmulatorCall(this.phoneNumber);
    this.hasActiveCall = false;
  }

  async cleanUpCallState(options = {}) {
    if (this.hasActiveCall) {
      await AdbHelper.endCall({quiet: true}).catch(() => {});
    }

    await AdbHelper.cancelEmulatorCall(this.phoneNumber);

    if (options.resetSurface !== false) {
      await AdbHelper.resetDeviceSurface();
    }

    this.hasActiveCall = false;
  }
}

module.exports = AppSettingsCallRecoveryHelper;
