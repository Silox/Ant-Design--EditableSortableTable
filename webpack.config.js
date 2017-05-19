var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports =  {
    devtool: 'source-map',
    // This will be our app's entry point (webpack will look for it in the 'src' directory due to the modulesDirectory setting below). Feel free to change as desired.
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:8080',
        //'webpack/hot/dev-server',
        './src/index.tsx'
    ],
    // Output the bundled JS to dist/app.js
    output: {
        filename: 'app.js',
        path: path.resolve('dist')
    },
    resolve: {
        // Look for modules in .ts(x) files first, then .js(x)
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // Add 'src' to our modulesDirectories, as all our app code will live in there, so Webpack should look in there for modules
        modules: [
            'src',
            'node_modules'
        ]
    },
    module: {
        rules: [
            // .ts(x) files should first pass through the Typescript loader, and then through webpack
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'react-hot-loader/webpack'
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ],
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, "src")
            }
        ]
    },
    plugins: [
        // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
        new webpack.HotModuleReplacementPlugin(),
        new WebpackNotifierPlugin({ alwaysNotify: true }),
        new CheckerPlugin()
    ],
    devServer: {
        hot: true,
        disableHostCheck: true,
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "antd": "antd"
    }
};
