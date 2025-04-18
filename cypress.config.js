const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://prozorro.gov.ua/en/',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
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