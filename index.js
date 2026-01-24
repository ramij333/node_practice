const http = require("http");
const server = http.createServer((req,res) => {
    console.log('method: ', req.method)
    console.log('url: ', req.url)
    console.log('user agent: ', req.headers['user-agent']);
    if(req.url === '/' && req.method === 'GET') {
        res.writeHead(200, {"content-type": 'text/html'});
        res.end('Welcome Home');
    } else {
        res.writeHead(404, {"content-type": 'text/html'});
        res.end('<h1>404 - Not Found</h1>');
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});