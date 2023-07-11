const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){

  app.use(
      createProxyMiddleware( '/api', {
          target: 'https://openapi.naver.com',
          changeOrigin: true,
          // 하단 처리는 필수로 해주어야 한다. 아래의 내용이 없으면 url 경로에
          // api가 추가되어 경로를 찾을 수 없어진다.
          pathRewrite:{
            '^/api/':'/'
          }
      })
  )
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // localhost:3000에서의 요청을 허용
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
};