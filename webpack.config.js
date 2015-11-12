var path = require('path')

module.exports = {
    entry: './js/index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'css'),
                loaders: ["style", "css", "sass"]
            }
        ]
    }
}