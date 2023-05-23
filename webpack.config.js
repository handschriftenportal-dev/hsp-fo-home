const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  entry: './src/HspHome.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'hsp-fo-home.js',
    chunkFilename: 'hsp-fo-home.[contenthash].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
        }
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  devtool: 'source-map',
}
