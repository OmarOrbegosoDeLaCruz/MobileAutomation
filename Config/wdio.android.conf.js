const {settingsCapabilities} = require('./AndroidConfig');

exports.config = {
  runner: 'local',
  specs: [
    '../Tests/Android/**/*.js',
  ],
  exclude: [
    '../Tests/Android/BasicTest.js',
  ],
  maxInstances: 1,
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: process.env.WDIO_LOG_LEVEL || 'error',
  framework: 'mocha',
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'Reports/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    }],
  ],
  capabilities: [settingsCapabilities],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },
};
