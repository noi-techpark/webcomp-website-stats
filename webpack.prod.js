const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'webcomp-website-stats.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
