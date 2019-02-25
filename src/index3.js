import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {counter, addGun, removeGun, addGunAsync} from './index.redux'
import {Provider} from 'react-redux';
import Star from './component/Star'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// const store=createStore(counter,applyMiddleware(thunk))
/**
 * 用来方便浏览器redux插件调试
 * @type {Store<any & any> & any}
 */
const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))
// <App addGun={addGun} addGunAsync={addGunAsync} removeGun={removeGun}/>
const About = () => (
    <div>
        <h2>About</h2>
    </div>
)
const Topic = ({ match }) => (
    <div>
        <h3>33</h3>
    </div>
)

const StarComponent=()=>{

  return( 
  <div>
    <Star rateNum={4} />
   </div>
    ) 
}

ReactDOM.render(
    (
        <Provider store={store}>
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/topics">Topics</Link></li>
                        <li><Link to="/star">star</Link></li>

                    </ul>
                    <Route exact path="/" component={App}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/star" component={StarComponent}/>
                </div>
            </Router>
        </Provider>
    ),
    document.getElementById('root'))
// store.subscribe(render)
// registerServiceWorker();
