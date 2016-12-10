var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: './src/dist'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
};
