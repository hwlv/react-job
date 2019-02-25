import React, {Component} from 'react'
import {loadData} from '../../redux/user.redux'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "axios/index";
@withRouter
@connect(
    null,
    {loadData}
)
class Authroute extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        axios.get('/user/info').then(res => {
            if (res.status == 200) {
                console.log(res.data);
                if (res.data.code == 0) {
                    // 有登录信息de
                    this.props.loadData(res.data.data)
                } else {
                    this.props.history.push('/login')
                }
            }
        })
    }

    render() {
        return null
    }
}

export default Authroute