import React,{Component} from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component{
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state={}
    }
    componentDidMount(){
        console.log(this.props);
    }
    componentWillReceiveProps(nextProps){
        console.log('receiveProps');
        console.log(nextProps);
        console.log(this.props);
        if(!this.props.avatar){
            const icon=require(`../img/${nextProps.avatar}.png`)
            this.setState({
                icon:icon
            })
        }
       
    }
    render(){
        console.log('avatar-selector render')
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v=>({
                icon:require(`../img/${v}.png`),
                text:v
            }))
        console.log(avatarList);
            
        const gridHeader = this.state.icon
            ? (<div>
                <span>已选择头像</span>
                <img style={{width:20}} src={this.state.icon} alt=""/>
            </div>)
            : '请选择头像'
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={4}
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}
export default AvatarSelector