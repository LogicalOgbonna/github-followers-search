const path = require("path");
const pkg = require('./package.json');
const libraryName = pkg.name;
module.exports = {
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js",
        library: libraryName,
        libraryTarget: 'umd',
        publicPath: '/build/',
        umdNamedDefine: true
    },
    mode: "production",
    entry: "./src/lib/index.js",
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
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        }
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        },
        "antd": {
            commonjs: "antd",
            commonjs2: "antd",
            amd: "antd",
            root: "antd"
        }
    }
}