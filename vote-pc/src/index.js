import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Vote from './pages/vote/index';
import reducer from './redux/reducer';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
    HashRouter as Router,
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
                <Route path='/' component={Vote}></Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
