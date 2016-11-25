var resolve = require('path').resolve

module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['styles']
    }),
    require('postcss-nesting')(),
    require('postcss-custom-properties')()
  ]
}