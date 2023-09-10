const { SWFilePlugin } = require("./webpack/plugins");

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  //... 其他配置
  plugins: [
    //... 其他插件
    new SWFilePlugin(),
  ],
};
