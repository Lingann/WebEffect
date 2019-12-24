const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");

const webpackConfigBase = require("./webpack.base.conf");
const config = require("./webpack.env.conf");
/****************************插件引入*************************************/
// 清除目录等
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// process.env.NODE_ENV = "test";

const webpackConfigProd = {
    mode: 'production', // 通过mode声明生产环境
    output: {
        path: path.resolve(__dirname,'../dist'),
        //打包多出口文件
        filename: 'js/[name].[hash].js',
        // chunkFilename: "js/[id].[hash:8].chunk.js"
        // publicPath: './static_asset/'
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        //删除dist目录
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../'), //根目录
            // verbose Write logs to console.
            verbose: true, //开启在控制台输出信息
            // dry Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_URL' : '\"' + process.env.BASE_URL + '\"'
        }),
        // 分离css插件参数为提取出去的路径
        // new MiniCssExtractPlugin({
        //     filename: 'css/[name].[hash].min.css',
        // }),
        // 压缩css
        // new OptimizeCSSPlugin({
        //     cssProcessorOptions: {
        //         safe: true
        //     }
        // })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            // chunks: 'all',
            // minSize: 30000,
            // name:true,
            minSize: 30,  //提取出的chunk的最小大小
            cacheGroups: {
                default:{
                    name: 'common',
                    chunks: 'initial',
                    minChunks: 2  // 模块被引用2次以上才抽离
                },
                vendors: {  //拆分第三方库（通过npm|yarn安装的库）
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            }
        },
    }
};

module.exports = merge(webpackConfigBase,webpackConfigProd);