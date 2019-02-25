import React from 'react'
import {connect} from 'react-redux'
import { Button,List } from 'antd-mobile'
import { addGun, removeGun, addGunAsync } from './index.redux'
import './App.css'
const Item = List.Item;
const Brief = Item.Brief;

// const mapStatetoProps=(state)=>{
//     return {num:state}
// }
// const actionCreators={addGun,removeGun,addGunAsync}
// App=connect(mapStatetoProps,actionCreators)(App)
/**app */
// @connect(mapStatetoProps,actionCreators)
// @connect(
//     state=> {num:state},
//     {addGun,removeGun,addGunAsync}
// )
class App extends React.Component {
  constructor(props){
      super(props);
      this.state={
        soldiers:['虎子','柱子','王根生']
      }
  }
    state = {
        disabled: false,
    }


  render() {
      // const num=store.getState()
      // const num=this.props.num
      // const addGun=this.props.addGun
      // const removeGun=this.props.removeGun
      // const addGunAsync=this.props.addGunAsync
    return (
      <div className="App">
          {/*<Button type="primary">Button</Button>*/}
          <p>ant design example</p>
          <List renderHeader={()=>'士兵列表'}>
              {
                this.state.soldiers.map(v=>{
                  return <Item key={v}>{v}</Item>
                })
              }
          </List>
          <p>store example</p>
          <div>
              <h1>now i have {this.props.num} guns</h1>
              {/*<Button onClick={()=>store.dispatch(addGun())}>apply guns</Button>*/}
              {/*<Button onClick={()=>store.dispatch(removeGun())}>recovery guns</Button>*/}
              {/*<Button onClick={()=>store.dispatch(addGunAsync())}>recovery guns async</Button>*/}
              <Button onClick={this.props.addGun}>apply guns</Button>
              <Button onClick={this.props.removeGun}>recovery guns</Button>
              <Button onClick={this.props.addGunAsync}>recovery guns async</Button>

          </div>
      </div>
    );
  }
}

export default App;

// function decorateArmour(target, key, descriptor) {
//     const method = descriptor.value;
//     let moreDef = 100;
//     let ret;
//     descriptor.value = (...args)=>{
//         args[0] += moreDef;
//         ret = method.apply(target, args);
//         return ret;
//     }
//     return descriptor;
// }

/**redux */
// function counter(state=0,action) {
//     switch (action.type){
//         case 'add':
//             return state+1
//         case 'reduce':
//             return state-1
//         default:
//             return 10
//     }
// }
// function listener(){
//     const current=store.getState()
//     console.log(`现在是${current}`);
// }
// build store
// const store=createStore(counter)
// 订阅，每次state修改，都会执行listener
// store.subscribe(listener)
//输出初始值
// const init=store.getState()
// console.log(init);
// 提交状态变更的申请
// store.dispatch({type:'add'})
// store.dispatch({ type: 'reduce' })
// const afterAdd=store.getState()
// console.log(afterAdd);