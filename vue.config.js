// import { ProvidePlugin } from 'webpack'
// export const devServer = {
//   port: 8080,
//   host: '',
//   https: false,
//   hotOnly: false,
//   proxy: {
//     '/api': {
//       target: 'http://121.43.56.241:8080/CanteenWeb',
//       changOrigin: true, // 允许跨域
//       ws: true,
//       pathRewrite: {
//         '^/api': ' '
//       }
//     },
    
//   },
// }
// export function chainWebpack(config) {
//   config.plugin('provide').use(ProvidePlugin, [{
//     'window.Quill': 'quill'
//   }])
// }


const webpack = require('webpack')
module.exports = {
  devServer: {
    proxy: { //配置跨域
      '/api': {
        target: 'http://121.43.56.241:8080/CanteenWeb', //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true, //允许跨域
        ws: true,
        pathRewrite: {
          '^/api': ' '
        }
      },
      
    },
  },

  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      'window.Quill': 'quill'
    }])
  },
}