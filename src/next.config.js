/* eslint-disable */
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");
const srcDir = path.resolve(__dirname, "../../src"); 
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, "./assets/less/antd-custom.less"),
    "utf8"
  )
);

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = (file) => {};
}
module.exports = withFonts(
  withCSS(
    withLess({
      //   cssModules: true, // 开启css modules
    //   distDir: "build",
      enableSvg: true,
      lessLoaderOptions: {
        javascriptEnabled: true,
        // importLoaders: 1,
        // localIdentName: "[local]___[hash:base64:5]",
        modifyVars: themeVariables, // make your antd custom effective
      },
    //   target: "serverless",
      //   resolve: {
      // 	alias: {
      // 		// '@components': path.join(srcDir, 'components'),
      // 		// '@modules': path.join(srcDir, 'modules'),
      // 		// '@store': path.join(srcDir, 'store')
      // 	}
      // },
      //   pageExtensions: ["mdx", "jsx", "js", "tsx"],
      webpack(config, { isServer }) {
        //   config.module.rules.push({
        //     test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)$/i,
        //     use: {
        //       loader: "url-loader",
        //       query: {
        //         // inline base64 DataURL for <=2KB images, direct URLs for the rest
        //         //   limit: 2048,
        //         //   name: "[path][name][hash].[ext]"
        //       }
        //     }
        //   });
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === "function") {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals),
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: "null-loader",
          });
        }
        config.module.rules.push({
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        });
        config.plugins.push(new CleanWebpackPlugin());
        return config;
      },
    })
  )
);
// module.exports = withLess(
//   withCss({
//     // cssModules: true, // 开启css modules
//     // cssLoaderOptions: {
//     //   importLoaders: 1,
//     //   localIdentName: "[local]___[hash:base64:5]"
//     // },
//     // webpack(config) {
//     //   const eslintRule = {
//     //     enforce: "pre",
//     //     test: /.(js|jsx)$/,
//     //     loader: "eslint-loader",
//     //     exclude: [path.resolve(__dirname, "/node_modules")]
//     //   };
//     //   config.module.rules.push(eslintRule);
//     //   // Further custom configuration here
//     //   config.resolve.alias["~"] = path.resolve(__dirname);
//     //   config.module.rules.push({
//     //     test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
//     //     use: {
//     //       loader: "url-loader",
//     //       options: {
//     //         limit: 100000
//     //       }
//     //     }
//     //   });
//     //   return config;
//     // }
//   })
// );
