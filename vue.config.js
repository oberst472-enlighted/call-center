const devServer = 'https://calls-dev.enlighted.ru';

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: devServer,
        changeOrigin: true,
        secure: false
      },
    }
  },
};
