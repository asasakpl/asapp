const fs = require('fs')
const webpack = require('webpack')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: '"' + version + '"'
        }
      })
    ]
  },
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        publish: [
          'github'
        ]
      }
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
