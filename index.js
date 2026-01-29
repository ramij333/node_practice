const http = require('http');

const server = http.createServer((req,res) => {
    if(req.url === "/health" && req.method === "GET") {
        res.writeHead(200, {"content-type" : "application/json"})
        res.end(JSON.stringify({"status"  : "ok", "message" : "server is alive"}))
        return
    }
    if(req.url ==="/echo" && req.method === "POST") {
        let receivedData = ''
        req.on('data', (chunk) => {
            receivedData += chunk
        })
        req.on( 'end', () =>{
            res.writeHead(200,{"content-type" : "application/json"})
            res.end(JSON.stringify(
                {
                    "recieved" : true,
                    "data" : `${receivedData}`
                }
            ))
        }           
        )      
        return
    }
})

server.listen(3000, () => {
    console.log("server running on port 3000")
})












// const http = require("http");
// const url = require("url");

// const server = http.createServer((req,res) => {
//     let parsedUrl =  url.parse(req.url, true)
//     let pathName = parsedUrl.pathname
//     let NameValueInQuery = parsedUrl.query.name
    
//     if(req.url === '/' && req.method === 'GET') {
//         res.writeHead(200, {"Content-Type" : "text/plain"})
//         res.end('Home')
//         return
//     }
//     else if(req.url === '/health' && req.method === 'GET') {
//         res.writeHead(200, {"Content-Type" : 'application/json'})
//         res.end(JSON.stringify({"status" : "ok"}))
//         return
//     }
//     else if(pathName === '/greet' && req.method === 'GET') {
//         if(NameValueInQuery) {
//             res.writeHead(200,{"content-type" : "text/plain"})
//             res.end(`Hello ${NameValueInQuery}`)
//             return
//         } else {
//             res.writeHead(400, {"content-type" : "text/plain"})
//             res.end("Name is required")
//             return
//         }
       
//     }
//     else {
//         res.writeHead(404, {"Content-Type" : "text/plain"})
//         res.end("Not Found")
//         return
//     }
   
// });

// server.listen(3000, () => {
//     console.log("Server running on port 3000");
// });