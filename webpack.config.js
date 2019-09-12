const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    //const CSSExtract = new MiniCssExtractPlugin('styles.css');
    return {
            entry: './src/app.js',
            output: {
                path: path.join(__dirname, 'public', 'dist'),
                filename: 'bundle.js'
            },
            module: {
                rules: [{
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },{
                    test: /\.s?css$/,
                    use: 
                        [{
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                            sourceMap:true
                            }
                        },
                        'css-loader',
                        'sass-loader',
                        ]
                    
                }]
            },
            plugins: [
                new MiniCssExtractPlugin({
                    filename: 'styles.css',
                    chunkFilename: 'id.css',
                    ignoreOrder: false, // Enable to remove warnings about conflicting order
                })
            ],
            devtool: isProduction ? 'source-map' : 'inline-source-map',
            devServer: {
                contentBase: path.join(__dirname, 'public'),
                historyApiFallback:true,
                publicPath: '/dist/'
            }
        };
        // loader
        
        
    }

