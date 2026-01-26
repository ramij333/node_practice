const http = require("http");
const server = http.createServer((req,res) => {
    if(req.url === '/' && req.method === 'GET') {
        res.writeHead(200, {"Content-Type" : "text/plain"})
        res.end('Home')
        return
    }
    else if(req.url === '/health' && req.method === 'GET') {
        res.writeHead(200, {"Content-Type" : 'application/json'})
        res.end(JSON.stringify({"status" : "ok"}))
        return
    } else {
        res.writeHead(404, {"Content-Type" : "text/plain"})
        res.end("Not Found")
        return
    }
   
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});