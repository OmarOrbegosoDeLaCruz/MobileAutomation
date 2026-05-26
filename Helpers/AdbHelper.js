const {execFile} = require('node:child_process');
const {existsSync} = require('node:fs');
const {join} = require('node:path');
const {promisify} = require('node:util');

const execFileAsync = promisify(execFile);

class AdbHelper {
  static getAdbPath() {
    if (process.env.ADB_PATH) {
      return process.env.ADB_PATH;
    }

    const sdkRoot = process.env.ANDROID_HOME
      || process.env.ANDROID_SDK_ROOT
      || (process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Android', 'Sdk'));

    if (sdkRoot) {
      const adbFromSdk = join(sdkRoot, 'platform-tools', 'adb.exe');

      if (existsSync(adbFromSdk)) {
        return adbFromSdk;
      }
    }

    return 'adb';
  }

  static async run(args, options = {}) {
    const adbArgs = process.env.ANDROID_DEVICE_ID
      ? ['-s', process.env.ANDROID_DEVICE_ID, ...args]
      : args;

    const {stdout, stderr} = await execFileAsync(AdbHelper.getAdbPath(), adbArgs);

    if (!options.quiet && stdout.trim()) {
      console.log(stdout.trim());
    }

    if (!options.quiet && stderr.trim()) {
      console.warn(stderr.trim());
    }
  }

  static async simulateIncomingCall(phoneNumber) {
    console.log(`Simulating incoming call from ${phoneNumber}...`);
    await AdbHelper.run(['emu', 'gsm', 'call', phoneNumber]);
  }

  static async endCall(options = {}) {
    if (!options.quiet) {
      console.log('Ending the active call...');
    }

    await AdbHelper.run(['shell', 'input', 'keyevent', 'KEYCODE_ENDCALL'], {quiet: options.quiet});
  }

  static async acceptEmulatorCall(phoneNumber) {
    console.log('Accepting the incoming emulator call...');
    await AdbHelper.run(['emu', 'gsm', 'accept', phoneNumber]);
  }

  static async cancelEmulatorCall(phoneNumber) {
    await AdbHelper.run(['emu', 'gsm', 'cancel', phoneNumber], {quiet: true}).catch(() => {});
  }

  static async wakeDevice() {
    await AdbHelper.run(['shell', 'input', 'keyevent', 'KEYCODE_WAKEUP'], {quiet: true}).catch(() => {});
    await AdbHelper.run(['shell', 'wm', 'dismiss-keyguard'], {quiet: true}).catch(() => {});
  }

  static async pressHome() {
    await AdbHelper.run(['shell', 'input', 'keyevent', 'KEYCODE_HOME'], {quiet: true}).catch(() => {});
  }

  static async resetDeviceSurface() {
    await AdbHelper.wakeDevice();
  }

  static async launchSettings() {
    console.log('Bringing Settings back to the foreground...');
    await AdbHelper.run([
      'shell',
      'monkey',
      '-p',
      'com.android.settings',
      '-c',
      'android.intent.category.LAUNCHER',
      '1',
    ], {quiet: true});
  }
}

module.exports = AdbHelper;
