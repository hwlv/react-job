import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard'

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    componentWillMount(){
        console.log('will');
    }
    componentDidMount() {
        this.props.getUserList('genius')
        console.log('props');
        console.log(this.props.userlist);
    }
    render(){
        return <UserCard userlist={this.props.userlist}></UserCard>
    }

}
export default Boss