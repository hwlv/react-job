import React from 'react'
import {connect} from 'react-redux'
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
//通过withRouter获取路由信息
@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends React.Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    componentDidMount() {
        // this.props.getUserList('boss')
    }
    render(){
        const navList=this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location
        console.log(navList);
        // return <UserCard userlist={this.props.userlist}></UserCard>
        return (
            <div>
                <TabBar>
                    {
                        navList.map((v=>(
                            <TabBar.Item
                            badge={v.path==='/msg'?this.props.unread:0}
                            title={v.text}
                            key={v.path}
                            icon={{uri: require(`./img/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                            selected={pathname===v.path}
                            onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                            >

                            </TabBar.Item>
                        )))
                    }
                </TabBar>
            </div>
        )
    }

}
export default NavLinkBar