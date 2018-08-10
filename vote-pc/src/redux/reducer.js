// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import user  from './user';
import login  from './login';

export default combineReducers({
    user,
    login
})