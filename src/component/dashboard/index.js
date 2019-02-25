import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch, Route,Redirect} from 'react-router-dom'
import NavLinkBar from '../navlink'
import Boss from '../../component/boss'
import Genius from '../../component/genius'
import User from '../../component/user'
import Msg from '../../component/msg'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
@connect(
    state=>state,{getMsgList,recvMsg}
)
class DashBoard extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    componentDidMount(){
        if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
    }
    render(){
        const {pathname}=this.props.location
        const user=this.props.user
        console.log(user);
        
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type=='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type=='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ]
        if(!navList.find(v=>v.path==pathname)){
          return  <Redirect to={'/login'}></Redirect>
        }
        return (
            <div>
                <NavBar className='fixd-header' mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
                {/*<Route path='/boss' component={Boss}></Route>*/}
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>

        )
    }
}
export default DashBoard