const { application } = require('express')
const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const { v4 : uuidV4 } = require('uuid')
const io = require('socket.io')(server)

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room',(req,res) => {
    res.render('room',{roomid : req.params.room})
})

io.on('connection',(socket) => {
    socket.on('join-room', (roomid,userid) => {
        socket.join(roomid)
        socket.to(roomid).emit('user-connected',userid)
    })
})

PORT = 3000;
server.listen(PORT,()=> console.log('port connected'))