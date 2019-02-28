const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const Webpack = require('webpack');

module.exports = (env = {}, argv = {}) =>
{ 
    const isProd = argv.mode === 'production';
    const config =
    {
        mode: argv.mode || 'development', // we default to development when no 'mode' arg is passed
        entry:
        {
            main: './js/main.js'
        },
        output:
        {
            filename: '[name].js',
            path: path.resolve(__dirname, 'build/'),
            publicPath: "/dist/"
        },
        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use: [isProd ? MiniCssExtractPlugin.loader :
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use:
                    {
                        loader: 'babel-loader',
                        options:
                        {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins:
        [
            // new CopyWebpackPlugin([{ from: './content/images', to: 'content/images' }]),
            new MiniCssExtractPlugin({filename: 'styles.css'})
        ],
        resolve:
        {
            extensions: ['.js', '.jsx']
        }
    };
    return config;
};