const mongoose = require('mongoose')
const model = require('./model')
const User=model.getModel('user')
const Chat=model.getModel('chat')
User.find({},function(e,doc){
    console.log(e);
    console.log(doc);
})