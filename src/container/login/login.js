import React,{Component} from 'react'
import Logo from "../../component/logo/logo";
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from "../../redux/user.redux"
import imoocFrom from '../../component/imooc-form'
//属性代理,修改生命周期
// class Hello extends Component{
//     render(){
//         return <h2>hello </h2>
//     }
// }
// function WrapperHello(Comp){
//     class WrapComp extends Component{
//         render(){
//            return (
//             <div>
//                 <p>高阶组件</p>
//                 <Comp {...this.props}></Comp>
//             </div>
//            ) 
//         }
//     }
//     return WrapComp
// }
// Hello=WrapperHello(Hello)

@connect(
    state=>state.user, {login}
)
@imoocFrom
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
        }
        this.register=this.register.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    register(){
        this.props.history.push('/register')
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     })
    // }
    handleLogin(){
        this.props.login(this.props.state)
    }
    render(){
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
                <Logo/>
                <h2>login</h2>
                <WingBlank>
                    <List>
                        {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                        <InputItem onChange={v=>this.props.handleChange('user',v)}>
                            用户
                        </InputItem>
                        <WhiteSpace />
                        <InputItem type="password"  onChange={v=>this.props.handleChange('pwd',v)}>
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login