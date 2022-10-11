// Path

let path = require('path')

console.log(__filename)
console.log(__dirname + '/app.js')

console.log('./index.html')

let absolutPath = path.join(__dirname, 'index.html')
console.log(absolutPath)

// Capture data on server

let http = require('http')

let server = http.createServer(handleRequest)

function handleRequest(req, res) {
  let store = ''
  req.on('data', (chunk) => {
    store += chunk
  })    
  req.on('end', () => {
    if (req.method === 'POST' && req.url === '/') {
      console.log(store)
      res.writeHead(201, { 'content-Type': 'application/json' })
      res.end(store)
    }
  })
}

server.listen(4000, () => {
  console.log('port num 4000')
})


