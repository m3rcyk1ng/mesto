const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'; //Переменная либо TRUE, либо FALSE дев или прод
const isProd = !isDev;

const filename = (ext) => isDev
    ? `[name].${ext}` //name будет определяться сама из названия файла
    : `[name].[contenthash].${ext}`; //prod:добавляет hash в название, чтоб файл всегда был уникальным от смены контента

module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: './pages/index.js',
    output: {
        filename: `./js/${filename('js')}`, //Название файла в dev сохранится, как и был
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HTMLWebPackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd //Убираем пробелы в зависимости от режима
            }
        }),
        new CleanWebpackPlugin(),
    ]


};