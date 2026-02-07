//day-14

const http = require('http')
const url = require('url')

function sendJSON(res, status, data) {
    res.writeHead(status, {"content-type" : "application/json"})
    res.end(JSON.stringify(data))
}
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const pathName = parsedUrl.pathname
    const pathNameArr = pathName.split('/')
    const [, secondparam, thirdParam, id] = pathNameArr
    if(secondparam === 'api' && thirdParam === 'user') {
        if (req.method === "GET") {
            if (pathNameArr.length>3) {
                if(id) {
                    if(isNaN(id)) {
                        return sendJSON(res, 400, {"error" : "Id must be a number"})
                    } else if (id == 1) {
                        return sendJSON(res, 200, {
                            "id" : id,
                            "name" : "Ramij"
                        })
                    } else if(id == 99) {
                        return sendJSON(res, 404, {
                            "error" : "User not found"
                        })
                    } else {
                        return sendJSON(res, 200, {
                            "id" : id,
                            "name" : "unknown"
                        })
                    }

                } else {
                    return sendJSON(res, 400, {"error" : "User ID required"})
                }
            } else {
                return sendJSON(res, 200, {
                    "users" : [
                        {"id" : 1, "name" : "Ramij"},
                        {"id" : 2, "name" : "Knight"}
                    ]
                })
            }       
        }
        else if(req.method === "POST") {
        
            let data = ''
            
            req.on('data', (chunk) => {
                data += chunk
            })
            req.on('end', () => {
                let trimmedData = data.trim()
                if(trimmedData.length<1) {
                    return sendJSON(res, 400, {
                        "error" : "Request body required"
                    })
                } else {
                    try {
                        data = JSON.parse(data)
                    } catch (error) {
                        return sendJSON(res, 400, {"error" : "Invalid JSON"})
                    }
                }
                if(data.name) {
                    return sendJSON(res, 201, {
                        "created" : true,
                        "user": {"id" : 3, "name" : data.name}
                    })
                } else {
                    return sendJSON(res, 400, {"error" : "Name is required"})
                }
               
            })
        }
        else {
            return sendJSON(res, 405, {"error" : "method not allowed"})
        }
    }
    else {
        return sendJSON(res, 404, {"error" : "Route not found"})
    }
   
})

server.listen(3000, () => {
    console.log('server is running on port 3000')
})



//day-13

// const http = require('http')
// const url = require('url')

// function sendJSON(res, status, data) {
//     res.writeHead(status, {"content-type" : "application/json"})
//     res.end(JSON.stringify(data))
// }
// const server = http.createServer((req, res) => {
//     const parsedUrl = url.parse(req.url, true)
//     const pathName = parsedUrl.pathname
//     const pathNameArr = pathName.split('/')
//     const [firstParam, secondparam, thirdParam] = pathNameArr
//     if(secondparam === 'api' && thirdParam === 'user') {
//         if (req.method === "GET") {
        
//             return sendJSON(res, 200, {
//                 "users" : [
//                     {"id" : 1, "name" : "Ramij"},
//                     {"id" : 2, "name" : "Knight"}
//                 ]
//             })
        
//         }
//         else if(req.method === "POST") {
        
//             let data = ''
            
//             req.on('data', (chunk) => {
//                 data += chunk
//             })
//             req.on('end', () => {
//                 let trimmedData = data.trim()
//                 if(trimmedData.length<1) {
//                     return sendJSON(res, 400, {
//                         "error" : "Request Body Required"
//                     })
//                 } else {
//                     try {
//                         data = JSON.parse(data)
//                     } catch (error) {
//                         return sendJSON(res, 400, {"error" : "Invalid JSON"})
//                     }
//                 }
//                 if(data.name) {
//                     return sendJSON(res, 201, {
//                         "created" : true,
//                         "user": {"id" : 3, "name" : data.name}
//                     })
//                 } else {
//                     return sendJSON(res, 400, {"error" : "Name is required"})
//                 }
                
                
//             })
//         }
//         else {
//             return sendJSON(res, 405, {"error" : "method not allowed"})
//         }
//     }
//     else {
//         return sendJSON(res, 404, {"error" : "Route not found"})
//     }
    
    
// })

// server.listen(3000, () => {
//     console.log('server is running on port 3000')
// })


//day-12

// const http = require('http');
// const url = require('url');

// function sendJSON(res, status, data) {
//     res.writeHead(status, {"content-type" : "application/json"})
//     res.end(JSON.stringify(data))
// }

// const server = http.createServer((req, res) => {
//     const parsedUrl = url.parse(req.url, true)
//     const pathName = parsedUrl.pathname
//     const pathNameArr = pathName.split('/')
//     if (pathNameArr[1] === 'api' && pathNameArr[2] === 'user') {
//         if(req.method === "POST") {
//             let body = ''
//             req.on("data", chunk => {
//                 body += chunk
//             })
//             req.on("end", () => {
//                 let trimmedData = body.trim()
//                 let data 
//                 if(trimmedData.length<1) {
//                     return sendJSON(res, 400, {"error" : "Request body required"})
//                 } else {
//                     try {
//                         data = JSON.parse(body)
//                     } catch (error) {
//                         return sendJSON(res, 400, {"error" : "Invalid JSON"})
//                     }
                    
//                 }              
//                 if (!data.name) {
//                     return sendJSON(res, 400, {"error" : "Name is required"})
//                 }
//                 else {
//                     return sendJSON(res, 201, {
//                         "created" : true,
//                         "user" : {
//                             "id" : 1,
//                             "name" : data.name
//                         }
//                     })
//                 } 
                
//             })
//             return
//         }
//         if (req.method != "POST") {
//             return sendJSON(res, 405, {"error" : "Method not allowed"})
//         }
        
//     } else {
//         return sendJSON(res, 404, {"error" : "Route not found"})
//     }
// })
// server.listen(3000, () => {
//     console.log('server listening on port 3000')
// })



//day 11

// const http = require('http')
// const url = require('url')

// function sendJSON(res, status, data) {
//     res.writeHead(status, {"content-type" : "application/json"})
//     res.end(JSON.stringify(data))
// }

// const server = http.createServer((req,res) => {
//     parsedUrl = url.parse(req.url, true)
//     queryData = parsedUrl.query
//     pathName = parsedUrl.pathname
//     pathNameArr = pathName.split('/')
    

//     if(pathNameArr[1] === 'api' && pathNameArr[2] === "user" && req.method === "GET") {
//         if(pathNameArr[3]) {
//             if (isNaN(pathNameArr[3]) === true) {
//                 return sendJSON(res, 400, {"error" : "ID must be a number"})
//             } else {
//                 if(queryData.name) {
//                    return sendJSON(res, 200, {
//                         "id" : pathNameArr[3],
//                         "name" : queryData.name,
//                         "message" : "Profile loaded"
//                     })
//                 } else {
//                     return sendJSON(res, 400, {
//                         "error" : "name query is required"
//                     })
//                 }
//             }
//         } else {
//             return sendJSON(res, 400, {"error" : "User ID required"})
//         }
//     } else {
//         if (req.method != "GET") {
//           return sendJSON(res, 405, {"error" : "Method not allowed"})
//         } else {
//             return sendJSON(res, 404, {"error" : "Route not found"})
//         } 
//     } 

// })

// server.listen(3000, () => {
//     console.log("server is running on port 3000")
// })


//day 10
// const http = require('http');
// const url = require('url')

// function sendJSON(res, statusCode, data) {
//     res.writeHead(statusCode, {"content-type" : "application/json"})
//     res.end(JSON.stringify(data))
// }
// const server = http.createServer((req, res) => {
//     let parsedUrl = url.parse(req.url, true);
//     let pathName = parsedUrl.pathname
//     let pathNameArr = pathName.split('/')
//     if (pathNameArr[1] === 'api' && pathNameArr[2] === "user" && req.method === 'GET') {
//         if (pathNameArr[3] && pathNameArr[3].length <3 &&  isNaN(pathNameArr[3]) === false) {
//             sendJSON(res, 200, {"id" : pathNameArr[3], "message" : "user profile found"})
//             return
//         } else {
//             sendJSON(res, 404, {"message" : "no user found"})
//             return
//         }              
//     } else if (pathNameArr[1] === 'api' && pathNameArr[2] === "health" && req.method === 'GET') {
//         sendJSON(res, 200, {"status" : "ok"})
//     }   
//     else {
//         sendJSON(res, 400, {"error" : "Route not found"})
//             return
//     }
// })

// server.listen(3000, () => {
//     console.log('server running on port 3000')
// })



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