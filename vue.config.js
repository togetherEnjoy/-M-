const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')
module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/dhr': {
        target: 'http://120.78.158.34',
        changeOrigin: true,
        ws: true,
        // pathRewrite: {
        //   '^/apiV1': ''
        // }
      }
    }
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 75,
            propList: ["*"]
          })
        ],
      },

    }
  },
  outputDir: process.env.outputDir
}