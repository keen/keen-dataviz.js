var pkg = require('./package.json');
var moment = require('moment');

module.exports = function(config){

  var browsers = {

    /*
      Internet Exploder
    */

    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },

    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8',
      version: '10'
    },

    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },

    // sl_ie_8: {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   platform: 'Windows XP',
    //   version: '8'
    // },

    /*
      iOS/iPhone
    */

    sl_ios: {
      base: 'SauceLabs',
      browserName: 'iPhone',
      platform: 'OS X 10.10',
      version: '8.1'
    },

    /*
      Android
    */

    sl_android_51: {
      base: 'SauceLabs',
      browserName: 'android',
      platform: 'Linux',
      version: '5.1'
    },

    sl_android_50: {
      base: 'SauceLabs',
      browserName: 'android',
      platform: 'Linux',
      version: '5.0'
    },

    sl_android_44: {
      base: 'SauceLabs',
      browserName: 'android',
      platform: 'Linux',
      version: '4.4'
    }

  };

  config.set({
    sauceLabs: {
      // username:  process.env.SAUCE_USERNAME,
      // accessKey: process.env.SAUCE_ACCESS_KEY,
      testName: pkg.name + '.js: ' + moment().format(' ddd, MMM Do, h:mm:ss a'),
      recordVideo: true,
      recordScreenshots: true,
      public: 'public'
    },
    action: 'run',
    browsers: Object.keys(browsers),
    browserDisconnectTimeout: 10 * 1000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 20 * 1000,
    captureTimeout: 300 * 1000,
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    },
    colors: true,
    customLaunchers: browsers,
    files: [
      './test/unit/build/browserified-tests.js'
    ],
    frameworks: [ 'mocha' ],
    reporters: [ 'nyan', 'saucelabs' ],
    singleRun: true
  });

};
