const proxy = require('http-proxy-middleware');

module.exports = (app) => {
app.use('/graphql', proxy({
target: 'http://192.168.1.15:8000',
changeOrigin: true,
}));
}