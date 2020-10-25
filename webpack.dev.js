const HTMLPlugin = require("html-webpack-plugin")
const path = require("path")
module.exports = {
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: '/dist/',
    },
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(sass|css|less)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        }
                    }
                ]
            }
        ]
    },


    plugins: [
        new HTMLPlugin({
            filename: "index.html",
            template: "./src/public/index.html"
        })
    ],

    devServer: {
        historyApiFallback: true,
        port: 3000
    }
}