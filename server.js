const Express =  require('express')
const http = require('http')
const socket = require('socket.io')

const port = 8080
app = Express()

let clientPath = `${__dirname}/public/`
console.log(`Serving the static files from ${clientPath}`)

app.use(Express.static('public'))
const server = http.createServer(app)

const io = socket(server)

io.on('connect', sock =>  {
    console.log(`Connected client: ${sock.id}`)
    sock.on('disconnect', msg => {
        console.log(`disconnected ${sock.id}`,msg)
    })
})

server.on('error', function(err) {
    console.log(`Server error: ${err}`)
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
