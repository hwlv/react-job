import React from 'react'
import {connect} from 'react-redux' 
import {List,Badge} from 'antd-mobile'

 
@connect(
	state=>state
)
class Msg extends React.Component{
    constructor(props) {
        super(props)
    }
    getLast(arr){
		return arr[arr.length-1]
	}
   render(){
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    const msgGroup = {} 
    this.props.chat.chatmsg.forEach(v=>{
        msgGroup[v.chatid] = msgGroup[v.chatid] || []
        msgGroup[v.chatid].push(v)
    })
    console.log(msgGroup);
    const chatList = Object.values(msgGroup).sort((a,b)=>{
        console.log(a); 
		console.log(b);
        const a_last = this.getLast(a).create_time
        const b_last = this.getLast(b).create_time
        return b_last - a_last
    })
    console.log(chatList);
    return (
        <div>
                {
                    chatList.map(v=>{
                        console.log(v);
                        const targetId=v[0].from==userid?v[0].to:v[0].from
                        const lastItem=this.getLast(v)
                        return (
                            <List key={lastItem._id}>
                                <Item>{lastItem.content}</Item>
                            </List>
                        )
                    })
                }
           
        </div>
    )
}
}

export default Msg