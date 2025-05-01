const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
    reporter: 'mochawesome',
    reporterOptions: {
      overwrite: false,
      html: false,
      json: true,
      reportDir: "cypress/report/mochawesome-report"
    },
    retries: {
      runMode: 2,
      openMode: 0,
    },
    env: {
      username: 'testuser',
      password: 'testpassword',
    },
  },
});
