import React,{Component} from 'react'
import {NavBar} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import {List, InputItem,TextareaItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {update} from '../../redux/user.redux'


@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            desc:'',
            company:'',
            money:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    componentDidMount(){
    }
    render(){
        console.log('render..');
        const props=this.props
        const path = props.location.pathname
        const redirect = props.redirectTo
        const job_desc=props.desc
        const job_title=props.title
        const job_avatar=props.avatar
        console.log(props);
        console.log('job_avatar');
        console.log(job_avatar);
        
        return (
            <div>
                {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
                <NavBar mode="dark" >牛人完善信息页</NavBar>
                <AvatarSelector
                    avatar={job_avatar}
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })
                    }}
                ></AvatarSelector>
                <InputItem value={job_title} onChange={(v)=>this.onChange('title',v)}>
                    求职岗位
                </InputItem>
                <TextareaItem
                    onChange={(v)=>this.onChange('desc',v)}
                    rows={3}
                    value={job_desc}
                    autoHeight
                    title='个人见解'
                >
                </TextareaItem>
                <Button
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                    type='primary'>保存</Button>
            </div>
        )
    }
}
export default GeniusInfo