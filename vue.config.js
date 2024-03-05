let path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    css: {
        // 是否提取css生成单独的文件 默认 true
        extract: false,
        // 使用 CSS source maps?
        sourceMap: true,
        // loader配置
        loaderOptions: {},
        // 使用 css Modules
        requireModuleExtension: true
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    publicPath: "./",
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://192.168.11.105:15465',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 "^/api": ""
    //             }
    //         }
    //     }
    // }
    chainWebpack: (config) => {

        // 配置 svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
