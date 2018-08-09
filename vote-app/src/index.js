import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home/index';
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
                <Route path='/home/:member' component={Home}></Route>
                <Route path='/' component={Home}></Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
