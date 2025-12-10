module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'not dead',
        'not ie 11'
      ]
    }),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'custom-properties': false,
        'focus-visible-pseudo-class': true,
        'prefers-color-scheme-query': true,
        'prefers-reduced-motion-query': true
      }
    }),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true
        },
        normalizeWhitespace: false
      }]
    })
  ]
}