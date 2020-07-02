//vue inspect > output.js
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const path = require("path");
module.exports = {
  publicPath: "/",
  assetsDir: "assets",
  productionSourceMap: false,
  configureWebpack: {
    performance: {
      hints: "warning",
      maxEntrypointSize: 5000 * 1024,
      maxAssetSize: 5000 * 1024,
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        analyzerHost: "127.0.0.1",
        analyzerPort: 8886,
        reportFilename: "report.html",
        defaultSizes: "parsed",
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: "stats.json",
        statsOptions: null,
        logLevel: "info",
      }),
      // new CompressionWebpackPlugin({
      //   filename: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: /\.js$|\.html$|.\css/, // 匹配文件名
      //   threshold: 10240, // 对超过1k的数据压缩
      //   deleteOriginalAssets: false // 不删除源文件
      // }),
    ]
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      let externals = {
        vue: 'vue',
        axios: 'axios',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        swiper: 'Swiper',
        jquery: 'jQuery',
        'element': 'ELEMENT',
        'vue2-editor': 'Vue2Editor'
      }
      config.externals(externals)
      const cdn = {
        css: [
          'https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.4.3/css/swiper.min.css',
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/theme-chalk/index.css',
        ],
        js: [
          //vue
          'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
          //vue-router
          'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.6/vue-router.min.js',
          //vuex
          'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.3/vuex.min.js',
          //axios
          'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
          //element-ui
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/locale/zh-CN.min.js',
          //vue-awesome-swiper
          'https://cdn.jsdelivr.net/npm/vue-awesome-swiper@4.1.1/dist/vue-awesome-swiper.min.js',
          //jquery
          'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.0/jquery.min.js',
          //vue2-editor
          'https://unpkg.com/vue2-editor/dist/vue2-editor.umd.min.js'
        ]
      }
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          args[0].minify.removeComments = false
          return args
        })
      // config.module
      //   .rule('images')
      //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      //   .use('image-webpack-loader')
      //   .loader('image-webpack-loader')
      //   .options({ bypassonDebug: true })
      //多线程打包
      config.module
        .rule('thread-loader')
        .test(/.js$/)
        .include
        .add(path.resolve(__dirname, 'src'))
        .end()
        .use('thread-loader')
        .loader('thread-loader')
        .options({
          workers: 3
        })
    }
    // config.optimization = {
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         chunks: 'all',
    //         test: /node_modules/,
    //         name: 'vendor',
    //         minChunks: 1,
    //         maxInitialRequests: 5,
    //         minSize: 0,
    //         priority: 100
    //       },
    //       common: {
    //         chunks: 'all',
    //         test: /[\\/]src[\\/]js[\\/]/,
    //         name: 'common',
    //         minChunks: 2,
    //         maxInitialRequests: 5,
    //         minSize: 0,
    //         priority: 60
    //       },
    //       styles: {
    //         name: 'styles',
    //         test: /\.(le|c)ss$/,
    //         chunks: 'all',
    //         enforce: true
    //       },
    //       runtimeChunk: {
    //         name: 'manifest'
    //       }
    //     }
    //   }
    // },
    config.optimization.minimize(true);
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
