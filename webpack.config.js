var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');

var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.js');
var pathToReactRouter = path.resolve(node_modules, 'react-router/umd/ReactRouter.min.js');
var pathToEs6Promise = path.resolve(node_modules, 'es6-promise/dist/es6-promise.js');
var pathToFetch = path.resolve(node_modules, 'whatwg-fetch/fetch.js');

var process = require('process');
var cwd = process.cwd();
// console.log(path.resolve(__dirname, "index.js"))
var config = {
    context: cwd,
    resolve: {
        // root:[__dirname],
        modulesDirectories: ["web_modules", "node_modules", "components"],
        alias: {
          // 'react': pathToReact,
          // 'react-dom': pathToReactDom,
          // 'react-router': pathToReactRouter
          "es6-promise": pathToEs6Promise,
          "whatwg-fetch": pathToFetch
        }
    },
    entry: {
      "main": ["./page/index.js"],
      "vendors": ['react', 'react-dom', 'react-router']
    },//[ path.resolve(__dirname, 'app.js')],//'webpack/hot/dev-server',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: "/dist/"
    },
    module: {
        loaders: [
          // LESS
          {
            test: /\.less$/,
            loader: 'style!css!less?{"modifyVars": {"color": "red"}}' //
          },
          {
            test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
            loader: 'url'
          },
          {
            test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
            loader: 'url'
          },
          {
              test: /\.jsx?$/,// run npm install babel-core babel-preset-es2015 babel-preset-react
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                presets: ['react', 'es2015']
              }
         },
        // {
        //       test: /\.jsx?$/,
        //       loader: 'babel-loader!jsx-loader?harmony'
        // },

      ],
      //如果在require文件时不想写文件后缀名，你可以在resolve.extensions告诉webpack
      resolve: {
        extensions: ['', '.js', '.json', '.coffee']
      },
      noParse: [ pathToEs6Promise, pathToFetch]
    },
    plugins: [
      // Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      // fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      // new webpack.ProvidePlugin({
      //    Promise: 'imports?this=>global!es6-promise',
      //    fetch: 'imports?this=>global!whatwg-fetch',
      // }),
      new webpack.optimize.CommonsChunkPlugin("vendors", 'vendors.js')
      //new ExtractTextPlugin('styles.css')


    ],
    resolveLoader: {
      //root: path.join(__dirname, 'node_modules')
    }
};

module.exports = config;
