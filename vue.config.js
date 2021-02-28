const path = require('path')
// const devServer = 'calls-dev.enlighted.ru';
const url = process.env.NODE_ENV === 'development' ? 'https://vc-dev.enlighted.ru/' : 'https://vc-dev.enlighted.ru/'
console.log(process.env.NODE_ENV)
module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
    devServer: {
        proxy: url,
        https: true
    }
};

function addStyleResource(rule) {
  rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          path.resolve(__dirname, './src/assets/scss/vars.scss')
        ]
      })
}



