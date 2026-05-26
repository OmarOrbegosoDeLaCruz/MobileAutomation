const settingsCapabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android',
  'appium:appPackage': 'com.android.settings',
  'appium:appActivity': '.Settings',
  'appium:settings[enforceXPath1]': true,
  'appium:settings[waitForIdleTimeout]': 0,
};

function buildAndroidOptions(capabilities = settingsCapabilities) {
  return {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: process.env.WDIO_LOG_LEVEL || 'error',
    capabilities,
  };
}

module.exports = {
  buildAndroidOptions,
  settingsCapabilities,
};
