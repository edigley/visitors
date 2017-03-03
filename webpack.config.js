const webpack = require("webpack");

var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
var webpackUglifyJslugin = require("webpack-uglify-js-plugin");
var ZipPlugin = require("zip-webpack-plugin");
var ShellPlugin = require("webpack-shell-plugin");
var argv = require("yargs").default({ env: "dev" }).argv;

const PACKAGE = require("./package.json");
var ENV = argv.env;

const DEPLOY_FILE_NAME = `${PACKAGE.name}-${PACKAGE.version}-${ENV}.zip`;
/*** NEXUS CONSTANTS ***/
const DEPLOY_URI=""
const DEPLOY_TO_NEXUS_CMD=`mvn deploy:deploy-file -DgroupId=com.edigley -DartifactId=${PACKAGE.name}=${ENV} -Dversion=${PACKAGE.version}
-DrepositoryId=gmrepo -DgeneratePom=true -Dpackaging=zip -Durl=${DEPLOY_URI} -Dfile=dist/zip/${DEPLOY_FILE_NAME}`;
const DEPLOY_TO_NEXUS_CMD_CURL=""
/*** END NEXUS CONSTANTS ***/

module.exports = {
	entry: {
		js: argv.env == "local" ? ["webpack/hot/only-dev-server", "react-hot-loader/patch", "babel-polyfill", "./app/index.js"] : [ "babel-polyfill", "./app/index.js"],
		vendor: ["react", "react-dom", "redux", "react-redux", "es6-promise", "react-addons-shallow-compare", "react-virtualized"]
	},
	devtool: (argv.env == "dev" || argv.env == "local") ? "source-map" : "",
	devServer: {
		contentBase: "dist/"
	},
	output: {
		path: __dirname + "/dist",
		filename: "assets/js/bundle.js"
	},
	module: {
		preLoaders: [
			{ test: /\.json$/, loader: "json" }
		],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel",
				query: {
					presets: ["es2015", "react", "stage-0"]
				}
			},
			{ test:/\.css$/, loader: "style-loader!css-loader" },
			{ test:/\.scss$/, loaders: ["style", "css", "sass"] },
			{ test:/\.less$/, loaders: ["style", "css", "less"] },
			{ test:/\.gif$/, loader: "url-loader?mimetype=image/jpg" },
			{ test:/\.png$/, loader: "url-loader?mimetype=image/png" },
			{ test:/\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
			{ test:/\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=assets/fonts/[name].[ext]" }
		]
	},
	plugins: (function (argv) {
		/* Common Plugins */
		var plugins = [
			new CleanWebpackPlugin((["dist"])),
			new webpack.optimize.CommonsChunkPlugin({
				name: "vendor",
				minChunks: Infinity,
				filename: "assets/js/vendor.bundle.js"
			}),
			new HtmlWebpackPlugin({
				template: __dirname + "/app/index.html",
				filename: "index.html",
				inject: "body"
			}),
			//new webpack.NormalModuleReplacementPlugin(/Autosuggest\.scss$/, "react-bootstrap-autosuggest/src/Autosuggest.scss"),
			new CopyWebpackPlugin([{ from: "app/assets", to: "assets" }]),
			new CompressionPlugin({test: /\.js$|\.css$|\html$/})
		];

		if (argv.clean) {
			console.info("\x1b[36m%s\x1b[0m", ":: Cleaning ::");
			plugins.push(new CleanWebpackPlugin((["dist"])));
		}

		if (argv.run) {
			console.info("\x1b[36m%s\x1b[0m", ":: Run config ::");
			plugins.push(new webpack.HotModuleReplacementPlugin());
			plugins.push(new webpack.NoErrorsPlugin());
		}

		console.warn("\x1b[36m%s\x1b[0m", `Environment: ${argv.env}`);

		switch (argv.env) {
			case "prod":
				plugins.push(
					new webpack.DefinePlugin({
						'process.env': {
							NODE_ENV: JSON.stringify("production")
						},
						API_URL: JSON.stringify('http://edigley.com/')
					})
				);
				break;
			case "uat":
			case "uat1":
			case "int":
			case "int1":
			case "int2":
			case "int3":
			case "int4":
				plugins.push(
					new webpack.DefinePlugin({
						'process.env': {
							NODE_ENV: JSON.stringify("production")
						},
						API_URL: JSON.stringify(`http://${argv.env}edigley.com/`)
					})
				);
				break;
			case "sit":
				plugins.push(
					new webpack.DefinePlugin({
						'process.env': {
							NODE_ENV: JSON.stringify("production")
						},						
						API_URL: JSON.stringify('http://localhost:9999/')
					})
				);
				break;				
			case "local":
				plugins.push(
					new webpack.DefinePlugin({
						API_URL: JSON.stringify('http://localhost:9999/')
					})
				);
				break;				
			default:
				plugins.push(
					new webpack.DefinePlugin({
						API_URL: JSON.stringify('http://localhost:9999/')
					})
				);			
				break;
		}

		/* Enabled if --package is added as parameter */
		if (argv.package) {
			console.info("\x1b[36m%s\x1b[0m", ":: Packaging ::");
			plugins.push(
				new webpackUglifyJslugin({
					cacheFolder: __dirname,
					debug: false,
					minimize: true,
					sourceMap: false,
					output: {
						comments: false
					},
					compress: {
						warnings: false,
						screw_ie8: true
					},
				})
			);
			plugins.push(new ZipPlugin({ path: 'zip', filename: DEPLOY_FILE_NAME, }));
		}
		/* Enabled if --deploy is added as parameter */
		if (argv.package) {
			console.info("\x1b[36m%s\x1b[0m", ":: Deploying ::");
			plugins.push(new ShellPlugin({
				onBuildEnd: [DEPLOY_TO_NEXUS_CMD_CURL],
				safe: true
			}));
		}
		return plugins;
	})(argv)
};