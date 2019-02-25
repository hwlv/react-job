import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

function count(state = 0, action) {
    switch (action.type) {
        case 'ADD':
            console.log('add triger');
            return state + 1
        case 'REDUCER':
            console.log('REDUCER triger');
            return state - 1;
        default:
            return state
    }
}

let store = createStore(count, applyMiddleware(thunk));

let currentValue = store.getState();
console.log('当前的值:', currentValue);

//定义一个监听的方法
let listener = () => {
    const previosValue = currentValue;
    currentValue = store.getState();
    console.log('上一个值:', previosValue, '当前值:', currentValue)
}
//创建一个监听
store.subscribe(listener);

console.log(store);
//分发任务
store.dispatch({type: "ADD"});
store.dispatch({type: "ADD"});
store.dispatch({type: "ADD"});
store.dispatch({type: "REDUCER"});

setTimeout(() => {
    store.dispatch({type: 'REDUCER'})
}, 1000)



const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
    return {type: INCREMENT_COUNTER};
}

function incrementAsync() {
    return dispatch => {
        setTimeout(() => { // Yay! Can invoke sync or async actions with `dispatch`
            dispatch(increment());
        }, 1000);
    };
}

