import React,{Component} from 'react'
import Logo from "../../component/logo/logo";
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from "../../redux/user.redux"
import imoocFrom from '../../component/imooc-form'
@connect(
    state=>state.user,
    {register}
)
@imoocFrom
class Register extends Component{
    constructor(props){
        super(props)
        // this.state={
        //     user:'',
        //     pwd:'',
        //     repeatpwd:'',
        //     type:'genius'
        // }
    }
    componentDidMount(){
		this.props.handleChange('type','genius')
	}
    login(){
        this.props.history.push('/login')
    }
    handleRegister(){
        this.props.register(this.props.state)
        console.log(this.state);
        
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
                <Logo/>
                <h2>register</h2>
                <List>
                    {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                    <InputItem onChange={v=>this.props.handleChange('user',v)}>
                        用户
                    </InputItem>
                    <WhiteSpace />
                    <InputItem type="password" onChange={v=>this.props.handleChange('pwd',v)}>
                        密码
                    </InputItem>
                    <WhiteSpace />
                    <InputItem type="password"  onChange={v=>this.props.handleChange('repeatpwd',v)}>
                        确认密码
                    </InputItem>
                    <WhiteSpace />
                    <RadioItem checked={this.props.state.type=='genius'} onChange={() => this.props.handleChange('type','genius')}>
                        牛人
                    </RadioItem>
                    <RadioItem checked={this.props.state.type=='boss'} onChange={() => this.props.handleChange('type','boss')}>
                        boss
                    </RadioItem>
                </List>
                <WhiteSpace />
                <WingBlank>
                    <Button type='primary' onClick={()=>this.handleRegister()}>  注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register