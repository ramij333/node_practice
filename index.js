//day 10
const http = require('http');
const url = require('url')

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {"content-type" : "application/json"})
    res.end(JSON.stringify(data))
}
const server = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);
    let pathName = parsedUrl.pathname
    let pathNameArr = pathName.split('/')
    if (pathNameArr[1] === 'api' && pathNameArr[2] === "user" && req.method === 'GET') {
        if (pathNameArr[3] && pathNameArr[3].length <3 &&  isNaN(pathNameArr[3]) === false) {
            sendJSON(res, 200, {"id" : pathNameArr[3], "message" : "user profile found"})
            return
        } else {
            sendJSON(res, 404, {"message" : "no user found"})
            return
        }              
    } else if (pathNameArr[1] === 'api' && pathNameArr[2] === "health" && req.method === 'GET') {
        sendJSON(res, 200, {"status" : "ok"})
    }   
    else {
        sendJSON(res, 400, {"error" : "Route not found"})
            return
    }
})

server.listen(3000, () => {
    console.log('server running on port 3000')
})



//day-9

// const http = require('http');
// const url = require('url')

// const server = http.createServer((req, res) => {
//     let parsedUrl = url.parse(req.url, true);
//     let pathName = parsedUrl.pathname
//     let pathNameArr = pathName.split('/')
//     if (pathNameArr[1] === 'api' && pathNameArr[2] === "user" && req.method === 'GET') {
//         if (pathNameArr[3] && pathNameArr[3].length <3 &&  isNaN(pathNameArr[3]) === false) {
//             res.writeHead(200, {"content-type" : "application/json"})
//             res.end(JSON.stringify({"id" : pathNameArr[3], "message" : "user profile found"}))
//             return
//         } else {
//             res.writeHead(400, {'content-type' : 'text/plain'})
//             res.end('no user found')
//             return
//         }       
        
//     } else {
//         res.writeHead(404, {'content-type' : 'text/plain'})
//             res.end('not found')
//             return
//     }
// })

// server.listen(3000, () => {
//     console.log('server running on port 3000')
// })


//day-8

// const http = require('http');
// const url = require('url')

// const server = http.createServer((req, res) => {
//     let parsedUrl = url.parse(req.url, true);
//     let pathName = parsedUrl.pathname
//     let pathNameArr = pathName.split('/')
//     if (pathNameArr[1] === 'api' && pathNameArr[2] === "user" && req.method === 'GET') {
//         if (pathNameArr[3] && pathNameArr[3].length <3) {
//             res.writeHead(200, {"content-type" : "application/json"})
//             res.end(JSON.stringify({"id" : pathNameArr[3], "message" : "user profile found"}))
//             return
//         } else {
//             res.writeHead(400, {'content-type' : 'text/plain'})
//             res.end('no user found')
//             return
//         }       
        
//     } else {
//         res.writeHead(404, {'content-type' : 'text/plain'})
//             res.end('not found')
//             return
//     }
// })

// server.listen(3000, () => {
//     console.log('server running on port 3000')
// })


//day-7

// const http = require('http');
// const url = require('url');
// const server = http.createServer((req,res) => {

//     let parsedUrl = url.parse(req.url, true)
//     let pathName = parsedUrl.pathname
//     let queryName = parsedUrl.query
    

//     if(req.url === "/api/time" && req.method === "GET") {
//         let d = new Date()
//         let currentTime = d.toISOString();
//         res.writeHead(200,{"content-type" : "application/json"})
//         res.end(JSON.stringify({"now" : currentTime}))
//         return
//     }
//     else if(pathName && pathName === "/api/user" && req.method === "GET" && queryName.name) {
//         res.writeHead(200, {"content-type" : "application/json"})
//         res.end(JSON.stringify({"user" : `${queryName.name}`, "status" : "found"}))
//         return
//     } else {
//         res.writeHead(404, {'content-type' : 'text/plain'})
//         res.end('not found')
//         return
//     }

// })

// server.listen(3000, () => {
//     console.log('server is running on port 3000')
// })


//day-6
// const http = require('http');

// const server = http.createServer((req,res) => {
//     if(req.url === "/health" && req.method === "GET") {
//         res.writeHead(200, {"content-type" : "application/json"})
//         res.end(JSON.stringify({"status"  : "ok", "message" : "server is alive"}))
//         return
//     }
//     if(req.url ==="/echo" && req.method === "POST") {
//         let receivedData = ''
//         req.on('data', (chunk) => {
//             receivedData += chunk
//         })
//         req.on( 'end', () =>{
//             res.writeHead(200,{"content-type" : "application/json"})
//             res.end(JSON.stringify(
//                 {
//                     "recieved" : true,
//                     "data" : `${receivedData}`
//                 }
//             ))
//         }           
//         )      
//         return
//     }
// })

// server.listen(3000, () => {
//     console.log("server running on port 3000")
// })






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