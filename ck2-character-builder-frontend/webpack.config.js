const path = require('path');

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /bootstrap\.native/,
        use: {
          loader: 'bootstrap.native-loader'
        }
      }
    ]
  }
}