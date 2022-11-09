const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: { App: path.resolve(__dirname, "./src/index.js") ,
        },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename:  '[name].js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /node_modules/,
                use: [ MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
            }

        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".scss"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack & React",
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
            filename:'[name].css'
        }),
    ],
    devServer: {
        port: 3001,
        hot: true,
    },
    mode: production ? 'production' : 'development'
};