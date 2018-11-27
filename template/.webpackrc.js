import { resolve } from 'path';

export default {

  // 接口代理示例
  proxy: {
    "/api/": {
      "target": "http://172.18.169.39:6010/",
      "changeOrigin": true,
      "pathRewrite": {"^/api/": ""}
    }
  },
  devtool :'source-map',
  alias: {
    themes: resolve(__dirname, './src/themes'),
    layouts: resolve(__dirname, 'src/layouts'),
    assets: resolve(__dirname, 'src/assets'),
    common: resolve(__dirname, 'src/common'),
    pagetpl: resolve(__dirname, 'src/pagetpl'),
    annotation: resolve(__dirname, 'src/annotation'),
    components: resolve(__dirname, "./src/components"),
    utils: resolve(__dirname, "./src/utils"),
    services: resolve(__dirname, "./src/services"),
    models: resolve(__dirname, "./src/models"),
    config:resolve(__dirname, "./src/config"),
    baseModel:resolve(__dirname, "./src/baseModel"),
  },
  urlLoaderExcludes: [
    /\.svg$/,
  ]
}
