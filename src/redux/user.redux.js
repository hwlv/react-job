import axios from 'axios'
import {getRedirectPath} from '../util'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS='AUTH_SUCCESS'
const LOGOUT='LOGOUT'
const initState={
    redirectTo:'',
    isAuth:false,//is login
    msg:'',
    user:'',
    type:'',
}
function errorMsg(msg){
    return { msg, type:ERROR_MSG }
}
function authSuccess(obj){
    console.log(obj);
    const {pwd,...data} = obj
    return {type: AUTH_SUCCESS, payload:data}
}
export function loadData(userinfo) {
    return {type:LOAD_DATA,payload:userinfo}
}
export function logoutSubmit() {
    return {type:LOGOUT}
}

// reducer
export function user(state=initState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {...state, isAuth:false, msg:action.msg}
        case LOGOUT:
        return {...initState,redirectTo:'/login'}
        default:
            return state
    }
}
export function userinfo() {
    return dispath=>{
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
}
export function login({user,pwd}) {
    if(!user||!pwd){
        return errorMsg('用户密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(res=>{
            if (res.status==200&&res.data.code===0) {
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function register({user,pwd,repeatpwd,type}) {
    console.log(arguments);
    if(!user||!pwd||!type){
        return errorMsg('用户密码必须输入')
    }
    if (pwd!==repeatpwd) {
        return errorMsg('密码和确认密码不同')
    }
    return dispatch=>{
        axios.post('/user/register',{user,type,pwd}).then(res=>{
            if (res.status==200&&res.data.code===0) {
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }

}
export function  update(data) {
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if (res.status==200&&res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}