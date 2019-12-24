const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const envConfig = require('./webpack.env.conf');

const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                            // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                            // output: 'css/',
                            publicPath:process.env.NODE_ENV === "development" ? '../' : "../",
                            // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                            hmr: devMode, // 仅dev环境启用HMR功能
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: '[hash].[ext]',
                        limit: '8192',
                        outputPath: 'public/font/',
                        esModule: false,
                    }
                },
                exclude: [
                    path.resolve(__dirname,'../src/static_asset')
                ]
            },
            {
                test: /\.(png|jp?g)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: (url, resourcePath, context) => {
                            if (/my-custom-image\.png/.test(resourcePath)) {
                                return `other_public_path/${url}`;
                            }

                            if (/image/.test(resourcePath)) {
                                return `public/image/${url}`;
                            }
                            return `img/${url}`;
                        },
                        publicPath:  (url, resourcePath, context) => {
                            if (/my-custom-image\.png/.test(resourcePath)) {
                                return `other_public_path/${url}`;
                            }
                            if (/image/.test(resourcePath)) {
                                if (process.env.NODE_ENV=== 'test'){
                                    return envConfig.ENV_LIST[1].assetsPublicPath +`image/${url}`;
                                }else if (process.env.NODE_ENV=== 'production'){
                                    return envConfig.ENV_LIST[2].assetsPublicPath +`image/${url}`;
                                }else {
                                    return `public/image/${url}`;
                                }
                            }
                            return `img/${url}`;
                        },
                        esModule: false,
                    }
                }],
                exclude: [path.join(__dirname,'../static_asset')]

            },
            {
                test: /\.ejs$/,
                loader: 'underscore-template-loader',
                query: {
                    // root: "myapp",
                    attributes: ['img:src', 'x-img:src']
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        interpolate: true,
                        minimize: false
                    }}]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 这里的配置和webpackOptions.output中的配置相似
            // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
            filename: process.env.NODE_ENV === "development" ? 'css/[hash].css' : 'style/[name].[hash].css',
            chunkFilename: process.env.NODE_ENV === "development"  ? 'css/[hash].css' : 'style/[name].[hash].css',
        })
    ]
};
