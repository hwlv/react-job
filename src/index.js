import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect,Switch } from 'react-router-dom'

import Login from './container/login/login'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import Chat from './component/chat'
import DashBoard from './component/dashboard'
import reducers from './reducer'
import './config'
import './index.css'
// import './test/redux'
const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))
//page:boss genuis me(Personal Center) msg
//switch 只匹配第一个
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
					<Route path='/chat/:user' component={Chat}></Route>
                    <Route component={DashBoard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)