import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import User from './pages/user/index';
import Login from './pages/login/index';
import reducer from './redux/reducer';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';

//store
let store = createStore(reducer);
//渲染组件
ReactDOM.render(
    
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/user' component={User}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/' component={Login}></Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
