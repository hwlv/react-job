const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const app = express()
const server=require('http').Server(app)
const io=require('socket.io')(server)



io.on('connection',function(socket){
    socket.on('sendmsg',function(data){
        console.log(data);
        const {from,to,msg}=data
        const chatid = [from,to].sort().join('_')
		Chat.create({chatid,from,to,content:msg},function(err,doc){
            console.log('doc');
            console.log(doc);
			io.emit('recvmsg', Object.assign({},doc._doc))
		})
    })    
})
const userRouter = require('./user')

app.use(cookieParser())// analytic  cookie
app.use(bodyParser.json())//analytic post data
app.use('/user', userRouter)

app.get('/', function (req,res) {
    res.send('hello')
})
server.listen(9093, function () {
    console.log('Node app start at port 9093')
})
