var Path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: Path.resolve(__dirname, './src'),
    entry: './banner/banner.jsx',

    resolve: {
        extensions: [ '', '.js', '.jsx', '.css' ]
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [
                    'babel-loader', 
                    'eslint-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader'
                )
            },
            {
                test: /\.svg$/,
                loaders: [
                    'file-loader'
                ]
            }
        ]
    },

    eslint: {
        fix: true,
        configFile: Path.resolve(__dirname, './.eslintrc')
    },

    plugins: [
        new ExtractTextPlugin('style.css'),
        new Webpack.optimize.UglifyJsPlugin({
            comments: false
        })
    ],

    externals: {
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        'react-dom': {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        }
    },
    
    output: {
        path: Path.resolve(__dirname, './dist'),
        filename: 'react-banner.min.js',
        library: 'Banner',
        libraryTarget: 'umd'
    },

    stats: {
        children: false
    }
}
