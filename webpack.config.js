const path = require('path')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const createOptimization = () => {
  const config = {}
  
  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserPlugin()
    ]
  }
  
  return config;
}

const cssLoaders = extra => {
  const loaders = [
    'to-string-loader',
    'css-loader'
  ]
  
  if (extra) {
    loaders.push(extra)
  }
  
  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: 'dtf-nocturne.user.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@styles': './styles',
      '@scripts': './scripts'
    }
  },
  optimization: createOptimization(),
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}