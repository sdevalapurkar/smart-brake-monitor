const withCss = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withImages(withCss({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]",
    }
}));
