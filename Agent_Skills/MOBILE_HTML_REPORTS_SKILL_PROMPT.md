# Mobile HTML Reports Skill Prompt

Use this prompt when starting a new mobile automation project and you want HTML reports generated locally and in GitHub Actions.

```text
You are a senior mobile automation architect.

Your task is to add reliable HTML test reporting to this mobile automation project for both local/manual test runs and GitHub Actions CI runs.

Before editing anything, inspect the repo structure, package manager, test framework, existing scripts, CI workflow, current reporter configuration, and generated output conventions.

For WebdriverIO/Appium projects, prefer Allure reporting unless the project already has a different reporting standard.

Implement the reporting flow so that:
- The normal local test command generates report data and an HTML report.
- The CI pipeline generates the same report format.
- Test failures still fail the command or pipeline.
- HTML report generation still runs after the test command whenever raw results exist.
- CI uploads the generated HTML report as a GitHub Actions artifact.
- CI uploads raw report results on failure when useful for debugging.
- Report output is ignored by git.
- Logs such as appium.log are ignored by git.

Recommended WebdriverIO/Appium setup:
- Add @wdio/allure-reporter as a dev dependency.
- Add allure-commandline as a dev dependency.
- Configure WDIO reporters with both spec and allure.
- Write raw Allure results to Reports/allure-results.
- Generate HTML to Reports/allure-report.
- Use a small Node wrapper script to run WDIO, generate the report, and preserve the original WDIO exit code.
- Keep a raw test command available, such as test:android:raw, for debugging reporter issues.

In GitHub Actions:
- Set up Java before generating Allure reports, because allure-commandline requires Java.
- Use actions/setup-java with a stable Temurin JDK, such as Java 17.
- Upload Reports/allure-report as an artifact with if: always().
- Upload Reports/allure-results on failure if useful.
- Remember that GitHub Actions artifacts are downloadable zip files; GitHub does not directly host their index.html as an interactive page.

Be careful to avoid the common issues:
- Do not assume Allure HTML can be opened by double-clicking index.html. Serve it over HTTP.
- Do not assume the artifact page itself is the report viewer. Download and extract the artifact first.
- Do not run a local static server from the wrong directory. Serve the folder that directly contains index.html.
- If serving the repo root, open the nested report path, such as /Reports/allure-report/.
- If serving the extracted artifact report folder, open the server root, such as http://localhost:8090/.
- If the report appears blank, check browser DevTools for 404s on app.js, styles.css, widgets, or data files.
- If port 8080 is busy and http-server fails with EADDRINUSE, use another port such as 8090.
- If local report generation fails with JAVA_HOME or java not found, install a JDK and ensure java is available in PATH.
- Do not commit Reports/, appium.log, or generated report artifacts.
- Avoid placing report generation only in CI; local and CI should follow the same path where possible.

Suggested local viewing instructions:
- After npm test, serve Reports/allure-report:
  npx http-server Reports/allure-report -p 8090
- Then open:
  http://localhost:8090
- For a downloaded GitHub Actions artifact, extract allure-html-report.zip, enter the extracted folder that contains index.html, run:
  npx http-server . -p 8090
- Then open:
  http://localhost:8090

After implementing:
- Show the changed files.
- Explain how local users generate and view the report.
- Explain where the CI report artifact appears.
- Explain why the report may look blank if opened incorrectly.
- Mention Java/JDK requirements for local report generation.
- Mention anything that could not be verified locally.
```
