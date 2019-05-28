const blacklist = require('metro-bundler/src/blacklist')

module.exports = {
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
  },
}