import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Vote from './pages/vote/index';
import Other from './pages/other/index';
import reducer from './redux/reducer';
import registerServiceWorker from './registerServiceWorker';
import './index.css'
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
                <Route path='/other' component={Other}></Route>
                <Route path='/' component={Vote}></Route>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker();
