import React from 'react';
import {changeTextAction,buttonClickAction,loginSuccess} from '../../redux/login/index'
import {  connect } from 'react-redux';

//定义组件
@connect(state=> {
    return { login: state.login }
},mapDispatchToProps)
export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(){
        console.log(this.props)
        this.props.loginSuccess(22);
    }
    render() {
        console.log(this.props)
        const {login, onChangeText, onButtonClick} = this.props;
        return (
            <div>
                <h1>login</h1>
                <h1 onClick={onChangeText}> {login.text} </h1>
                <button onClick={onButtonClick}>click me</button>
                <button onClick={this.handleLogin}>click me</button>
            </div>
        );
    }
}
//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        onButtonClick:()=>dispatch(buttonClickAction),
        onChangeText:()=>dispatch(changeTextAction),
        loginSuccess:(arg)=>dispatch(loginSuccess(arg)),
    }
}


