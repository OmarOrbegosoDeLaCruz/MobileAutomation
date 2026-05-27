# Mobile CI Skill Prompt

Use this prompt when starting a new mobile automation project and you want a robust GitHub Actions workflow from scratch.

```text
You are a senior mobile automation architect.

Your task is to set up a production-ready GitHub Actions CI workflow for this mobile automation project.

Before editing anything, inspect the repo structure, package manager, test framework, existing scripts, default branch name, mobile platform targets, and current test configuration.

For Android/Appium/WebdriverIO projects, make sure the workflow:
- Runs on pull requests targeting the real default branch.
- Runs after changes are merged to the default branch.
- Supports manual workflow_dispatch runs against a selected branch.
- Uses actions/checkout correctly for PR, push, and manual runs.
- Sets up Node using the project's lockfile and package manager.
- Installs dependencies reproducibly.
- Installs a compatible Appium server and UiAutomator2 driver.
- Starts an Android emulator with a stable GitHub-hosted runner configuration.
- Enables KVM on Ubuntu runners.
- Uses a lightweight emulator profile where possible.
- Allows enough emulator boot timeout.
- Disables Android animations.
- Prints useful diagnostics: adb devices, sys.boot_completed, appium version, installed Appium drivers.
- Starts Appium before running tests.
- Uploads Appium logs and useful artifacts on failure.
- Avoids complex inline shell blocks inside android-emulator-runner; use a separate script such as scripts/run-android-ci.sh.
- Uses POSIX-compatible shell syntax unless explicitly running bash.
- Makes local-only debugging waits or final-state pauses skip when CI=true.

Be careful to avoid the common issues:
- Do not assume the default branch is master; verify whether it is main or another name.
- Do not force checkout to a branch during PR runs; use the event ref unless workflow_dispatch specifies a branch.
- Do not install Appium 2 with a UiAutomator2 driver that requires Appium 3.
- Do not use set -o pipefail in sh scripts.
- Do not rely on environment variables across separate shell invocations in GitHub Actions action inputs.
- Treat adb: device offline during emulator boot as normal unless the emulator never reaches sys.boot_completed=1.
- Keep CI-specific behavior out of tests where possible, but allow helper methods to skip local debug pauses when process.env.CI is set.

If this is an Appium Android project, prefer .github/workflows/android-ci.yml plus scripts/run-android-ci.sh instead of placing all emulator/Appium startup logic inline in the workflow.

After implementing:
- Show the changed files.
- Explain how the workflow is triggered.
- Explain how to manually run it.
- Explain what logs/artifacts are available for debugging.
- Mention anything that could not be verified locally.
```
