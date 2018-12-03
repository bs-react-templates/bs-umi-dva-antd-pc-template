export default {
  plugins: [
    ['umi-plugin-dva', {
      exclude: (a) => {
        if (a === "baseModel.js") {
          return true;
        } else {
          return false
        }


      }, //这里是以$开头的model不会被引用
    }],
    [
      'umi-plugin-routes', {
        exclude: [
          /model\.(j|t)sx?$/,
          /services\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /style\//,
          /components\//,
          /services\//,
          /chart\/Container\.js$/,
        ],
      },
    ],
    /*    [
          'umi-plugin-dll',
          {
            exclude: ['model'],
            include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es", "sc-dva-antd-pro/es"],
          },
        ],*/
  ],
}
