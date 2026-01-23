const http = require("http");
const server = http.createServer((req,res) => {
    if(req.url === '/') {
        res.writeHead(200, {"content-type": 'text/html'});
        res.end('Home route')
    } else if (req.url === '/health') {
        res.writeHead(200, {"content-type": 'text/html'});
        res.end('ok')
    } else {
        res.writeHead(404, {"content-type": 'text/html'});
        res.end('<h1>404 - Not Found</h1>')
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});