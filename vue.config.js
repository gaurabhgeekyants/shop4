/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - Clean Vue.js Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


module.exports = {
//  publicPath: process.env.NODE_ENV === 'production',  
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  // configureWebpack: {
  //   optimization: {
  //     splitChunks: {
  //       chunks: 'all'
  //     }
  //   }
  // },
  devServer: {
    proxy: 'http://d2xdmhkmkbyw75.cloudfront.net'
  }
}
