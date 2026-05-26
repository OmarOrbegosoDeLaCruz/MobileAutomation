const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.android.settings',
  'appium:appActivity': '.Settings',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function openSettings() {
  console.log('Opening Apps...');
  const appItem = await driver.$('//*[@text="Apps"]');
  await appItem.click();
}

async function runTest() {
  console.log('Starting Android Settings test...');
  const driver = await remote(wdOpts);
  try {
    console.log('Waiting for the Apps menu item...');
    const appsItem = await driver.$('//*[@text="Apps"]');

    console.log('Opening Apps...');
    await appsItem.click();

    console.log('Apps screen opened. Holding the session so you can see it...');
    await driver.pause(5000);
  } finally {
    console.log('Closing the Appium session...');
    await driver.deleteSession();
  }
}

runTest().catch(console.error);