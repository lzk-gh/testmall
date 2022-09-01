// const path = require('path')
//
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

module.exports = {
  transpileDependencies: true,

  // 配置别名
  configureWebpack: {
    resolve: {
      extensions: [],   // 可以使路径后缀名省略
      /* 别名 */
      alias: {
        /* @ 表示src */
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
