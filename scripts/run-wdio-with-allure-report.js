const {existsSync, readdirSync, rmSync} = require('node:fs');
const {join} = require('node:path');
const {spawnSync} = require('node:child_process');

const isWindows = process.platform === 'win32';
const binExtension = isWindows ? '.cmd' : '';
const wdioBin = join('node_modules', '.bin', `wdio${binExtension}`);
const allureBin = join('node_modules', '.bin', `allure${binExtension}`);
const resultsDir = join('Reports', 'allure-results');
const reportDir = join('Reports', 'allure-report');

function run(command, args) {
  return spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
  });
}

rmSync(resultsDir, {recursive: true, force: true});
rmSync(reportDir, {recursive: true, force: true});

const testRun = run(wdioBin, ['run', 'Config/wdio.android.conf.js']);
const testExitCode = testRun.status ?? 1;

if (existsSync(resultsDir) && readdirSync(resultsDir).length > 0) {
  const reportRun = run(allureBin, ['generate', resultsDir, '--clean', '-o', reportDir]);

  if (reportRun.status !== 0) {
    process.exit(reportRun.status ?? 1);
  }
} else {
  console.warn(`No Allure results found in ${resultsDir}; skipping HTML report generation.`);
}

process.exit(testExitCode);
