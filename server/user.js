const express = require('express')
const Router = express.Router()
const utils=require('utility')
const model = require('./model')
const User=model.getModel('user')
const Chat=model.getModel('chat')
const _filter={'pwd':0,'__v':0}

function md5Pwd(pwd) {
    const salt='react-job.*~~``';
    return utils.md5(utils.md5(pwd+salt)) 
}
Router.get('/list',function(req, res){
    const { type } = req.query
    // User.remove({},function(e,d){})
    User.find({type},{pwd:0},function(err,doc){
        return res.json({code:0,data:doc})
    })
})
Router.get('/getmsgList',function(req, res){
    const user = req.cookies.userid
    console.log('userid');
    console.log(user);
	User.find({},function(e,userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
		}) 
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
			if (!err) {
				return res.json({code:0,msgs:doc, users:users})
			}
		})   
	})
    // User.remove({},function(e,d){})
    // User.find({type},{pwd:0},function(err,doc){
    //     return res.json({code:0,data:doc})
    // })
})

Router.post('/register',function(req, res){
    const {user, pwd, type} = req.body
    User.findOne({user},function (err,doc) {
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        //User.create返回不了id。
        const userModel=new User({user,pwd:md5Pwd(pwd),type});
        userModel.save(function (e,d) {
            if(e){
                return res.json({code:1,msg:'500 error'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code:0,data:{user, type, _id}})
        })
        // User.create({user,pwd:md5Pwd(pwd),type},function (e,d) {
        // })
    })
})


Router.post('/login',function(req, res){
    console.log(req.body);
    const {user, pwd} = req.body
    //参数：条件，显示
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function (err,doc) {
        console.log(doc);
        if(doc){
            res.cookie('userid', doc._id)
            return res.json({code:0,data:doc})
        }else{
            return res.json({code:1,msg:'用户名或密码错误'})
        }

    })
})
Router.get('/info',function (req,res) {
    console.log(res.cookies);
    const {userid}=req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({'_id':userid},_filter,function (err,doc) {
        if(err){
            return res.json({code:1,msg:'500 error'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})
Router.post('/update',function (req,res) {
    const userid = req.cookies.userid
    const body = req.body
    if(!userid){
        return res.json({code:1})
    }
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})

module.exports = Router