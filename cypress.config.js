const { defineConfig } = require("cypress");
const webpack = require('@cypress/webpack-preprocessor');

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

    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
          module: {
            rules: [
              {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-modules-commonjs'],
                  },
                },
              },
            ],
          },
          mode: 'development',
        },
      };
      on('file:preprocessor', webpack(options));
      return config;
    },
  },
});