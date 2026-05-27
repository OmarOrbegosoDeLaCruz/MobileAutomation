#!/usr/bin/env sh
set -eu

adb devices -l
adb shell getprop sys.boot_completed
adb shell input keyevent KEYCODE_WAKEUP || true
adb shell wm dismiss-keyguard || true

APPIUM_LOG="${GITHUB_WORKSPACE:-.}/appium.log"
appium --address 127.0.0.1 --port 4723 --log-level error > "$APPIUM_LOG" 2>&1 &
APPIUM_PID=$!

cleanup() {
  kill "$APPIUM_PID" || true
}

trap cleanup EXIT

until curl -sf http://127.0.0.1:4723/status >/dev/null; do
  sleep 2
done

appium --version
appium driver list --installed
npm test
