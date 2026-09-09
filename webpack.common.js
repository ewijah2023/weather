import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from "dotenv-webpack";

export default {
    entry: "./src/index.js",

    output: {
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
        new Dotenv(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use:["style-loader", "css-loader"],
            },
        ],
    },
};