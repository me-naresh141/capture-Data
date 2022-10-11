// Q. Create server which can handle both json/form data without specifying which format of data is being received.

// add listener on port 9000
// use data/end event to capture json/form data
// use req.headers['Content-Type'] to check data format
// parse respective data format i.e. json/form
// send entire data in response
// data sent from postman should have fields:
// city
// state
// country
// pin

let http = require('http')
let qs = require('querystring')
let events = require('events')
const { json } = require('stream/consumers')
let server = http.createServer(handleRequest)

// function handleRequest(req, res) {
//   let store = ''
//   console.log(req.headers['content-type'])
//   req.on('data', (chunk) => {
//     store += chunk
//   })
//   req.on('end', () => {
//     if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
//       let parseData = qs.parse(store)
//       res.end(JSON.stringify(parseData))
//     }
//     if (req.headers['content-type'] === 'application/json') {
//       res.end(store)
//     }
//   })
// }


function handleRequest(req, res) {
  let store = ''
  console.log(req.headers['content-type'])
  req.on('data', (chunk) => {
    store += chunk
  })
  req.on('end', () => {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      let parseData = qs.parse(store)
      res.end(JSON.stringify(parseData))
    }
    if (req.headers['content-type'] === 'application/json') {
        let parseData = json.parse(store)
        res.end(`<h2>${parseData.name}</h2><p>${parseData.email}</p>`)
    }
  })
}


server.listen(9000, () => {
  console.log('port num 9000')
})
