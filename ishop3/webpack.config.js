const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin({
    filename: "style.css"
});

module.exports = { 
    entry: ['@babel/polyfill' ,'./src/app.js'], // основной файл приложения
    output:{
        path: path.join(__dirname, 'dist'), // путь к каталогу выходных файлов
        filename: 'app.js'  // название создаваемого файла
    }, 
    devtool:'source-map',
    module:{ 
        rules:[
            { 
                test: /\.jsx?$/, // какие файлы обрабатывать
                exclude: /node_modules/, // какие файлы пропускать
                use: { loader: "babel-loader" }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use: ["css-loader"]
                })
            }            
        ] 
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // contentBase: __dirname + '/dist',
        port: 8080
    },
    plugins: [
        extractCSS
    ]
}