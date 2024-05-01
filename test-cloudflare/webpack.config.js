const path = require('path');

module.exports = {
    target: 'webworker',
    entry: './index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'raw-loader',
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'worker.js',
    },
};
