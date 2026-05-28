# MobileAutomation

MobileAutomation is a work-in-progress mobile test automation project focused on Android automation with Appium, WebdriverIO, Mocha, and Allure reporting.

The goal of this repository is to build a practical, maintainable automation framework for mobile scenarios that go beyond simple happy-path UI checks. It currently demonstrates Android system-app automation and interruption recovery, and it will continue growing with more complex real-world use cases.

## Project Status

This project is not finished.

It is being actively developed as a mobile automation portfolio and learning project. The current implementation is intentionally small, but the structure is designed to support additional Android workflows, helper utilities, reporting improvements, CI enhancements, and more advanced test scenarios over time.

## What It Does Today

The current test coverage focuses on Android Settings behavior when an incoming call interrupts the user flow.

Implemented scenarios include:

- Opening the Android Settings app.
- Navigating to the Apps settings screen.
- Simulating an incoming call on an Android emulator.
- Recovering after dismissing the incoming call.
- Recovering after answering and hanging up the incoming call.
- Generating Allure test results and an HTML report.
- Running Android tests in GitHub Actions using an emulator.

## Tech Stack

- Appium
- WebdriverIO
- Mocha
- Allure Reporter
- Android UiAutomator2
- ADB helper utilities
- GitHub Actions

## Project Structure

```text
Config/          WebdriverIO and Android capability configuration
Helpers/         Reusable automation helpers for ADB, driver actions, and recovery flows
Pages/           Page Object classes for Android screens
Tests/           Android test specifications
scripts/         Local and CI execution scripts
.github/         GitHub Actions workflow configuration
Agent_Skills/    Prompt files used to guide automation/reporting workflows
```

## Current Example Flow

The main example test is located in:

```text
Tests/Android/AppSettingsCallRecoveryTest.js
```

It validates that the Android Settings app can return to the Apps settings screen after call-related interruptions.

## Running Locally

Install dependencies:

```bash
npm ci
```

Start an Android emulator and make sure Appium with the UiAutomator2 driver is available.

Run the Android test suite:

```bash
npm test
```

Or run WebdriverIO directly:

```bash
npm run test:android:raw
```

Generate an Allure report from existing results:

```bash
npm run report:allure
```

The HTML report is generated under:

```text
Reports/allure-report
```

## Continuous Integration

The repository includes an Android CI workflow in:

```text
.github/workflows/android-ci.yml
```

The workflow installs Node.js, Java, Appium, the UiAutomator2 driver, starts an Android emulator, runs the tests, and uploads Allure report artifacts.

## Roadmap

Planned future improvements include:

- More complex Android interruption scenarios.
- Additional mobile app flows beyond Android Settings.
- Stronger reusable Page Object and helper patterns.
- Richer Allure reporting.
- Better device and emulator configuration options.
- More CI scenarios and debugging artifacts.
- Additional edge cases around app recovery, backgrounding, permissions, notifications, and system dialogs.

## Why This Repository Exists

This project is meant to show how I approach mobile automation architecture: clear structure, reusable helpers, readable tests, CI execution, and reporting that makes failures easier to understand.

It is not a finished product yet. It is an evolving foundation that I will continue expanding with more advanced and realistic mobile automation use cases.
