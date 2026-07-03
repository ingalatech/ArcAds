const ESLintPlugin = require('eslint-webpack-plugin');

const path = require('path');

const generatePlugins = (env) => {
  const plugins = [];

  if (env.production) {
    plugins.push(new ESLintPlugin());
  }
  return plugins;
};

module.exports = env => ({
  mode: env.production ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'arcads.js',
    library: {
      name: 'ArcAds',
      type: 'umd',
    },
  },
  devtool: env.development ? 'eval-source-map' : false,
  resolve: { extensions: ['.js', '.json'] },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: generatePlugins(env),
});
