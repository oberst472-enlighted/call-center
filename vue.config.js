const devServer = 'calls-dev.enlighted.ru';

module.exports = {
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



