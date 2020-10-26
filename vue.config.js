const path = require('path')
const devServer = 'calls-dev.enlighted.ru';

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
  devServer: {
    proxy: {
      '/api/v1' :{
        target: `http://188.43.103.251:8001`,  // api server
        changeOrigin: true,                           // needed for virtual hosted sites
        ws: true,                                     // proxy websockets
        pathRewrite: {
          // '^/api': ''
        },
        router: {
          'localhost:8080' : `http://188.43.103.251:8001/`
        },
      },
      '/api': {
        target: `https://${devServer}/`,  // api server
        changeOrigin: true,                           // needed for virtual hosted sites
        ws: true,                                     // proxy websockets
        pathRewrite: {
          // '^/api': ''
        },
        router: {
          'localhost:8080' : `https://${devServer}/`
        },
        cookieDomainRewrite: {
          "localhost": devServer,
        },
      },
    },

  }
};

function addStyleResource(rule) {
  rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './src/assets/scss/vars.scss'),
        ]
      })
}



