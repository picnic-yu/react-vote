import React from 'react';
import {changeTextAction,buttonClickAction} from '../../redux/user/index'
import {  connect } from 'react-redux';

//定义组件
class User extends React.Component{
    render() {
        console.log(this.props)
        const {user, onChangeText, onButtonClick} = this.props;
        return (
            <div>
                <h1>user</h1>
                <h1 onClick={onChangeText}> {user.text} </h1>
                <button onClick={onButtonClick}>click me</button>
            </div>
        );
    }
}


//映射Redux state到组件的属性
function mapStateToProps(state) {
    console.log(state)
    return { user: state.user }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        onButtonClick:()=>dispatch(buttonClickAction),
        onChangeText:()=>dispatch(changeTextAction)
    }
}

//连接组件
export default User = connect(mapStateToProps, mapDispatchToProps)(User)



