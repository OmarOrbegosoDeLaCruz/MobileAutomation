const BasePage = require('../BasePage');

class IncomingCallPage extends BasePage {
  get answerCallSelectors() {
    return [
      'android=new UiSelector().text("Answer")',
      'android=new UiSelector().description("Answer")',
      'android=new UiSelector().resourceId("com.google.android.dialer:id/answer_call_button")',
    ];
  }

  get declineCallSelectors() {
    return [
      'android=new UiSelector().text("Decline")',
      'android=new UiSelector().text("Dismiss")',
      'android=new UiSelector().description("Decline")',
      'android=new UiSelector().description("End call")',
      'android=new UiSelector().resourceId("com.google.android.dialer:id/incall_end_call")',
    ];
  }

  async answerIfVisible(timeout = 2000) {
    await this.clickFirstDisplayed(this.answerCallSelectors, timeout);
  }

  async dismissIfVisible(timeout = 2000) {
    await this.clickFirstDisplayed(this.declineCallSelectors, timeout);
  }
}

module.exports = IncomingCallPage;
