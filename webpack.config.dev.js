var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        './js/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'js'),
                loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react']
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'css'),
                loaders: ["style", "css", "sass"]
            }
        ]
    }
}
