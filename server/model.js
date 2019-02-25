const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL)
var db = mongoose.connection;

db.on('connected', function () {
        console.log('Mongoose connection open to ' + DB_URL);
});
db.on('error', function (err) {
        console.log('Mongoose connection error: ' + err);
});

const models = {
    user: {
        'user': {
            type: String,
            'require': true
        },
        'pwd': {
            type: String,
            'require': true
        },
        'type': {
            'type': String,
            'require': true
        },
        //头像
        'avatar': {
            'type': String,
            'default': 'boy'
        },
        // 个人简介或者职位简介
        'desc': {
            'type': String
        },
        // 职位名
        'title': {
            'type': String
        },
        // boss的两个字段
        'company': {
            'type': String
        },
        'money': {
            'type': String
        }
    },
    chat: {
        'chatid': {
            'type': String,
            'require': true
        },
        'from': {
            'type': String,
            'require': true
        },
        'to': {
            'type': String,
            'require': true
        },
        'read': {
            'type': Boolean,
            'default': false
        },
        'content': {
            'type': String,
            'require': true,
            'default': ''
        },
        'create_time': {
            'type': Number,
            'default': new Date().getTime()
        }
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}
