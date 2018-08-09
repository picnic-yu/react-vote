import React from 'react';
import HomeTab from './components/tabs';
import {  connect } from 'react-redux';
import {changeScore,changeState} from '../../redux/score/index';
//定义组件
@connect(state=> {
    return { score: state.score }
},mapDispatchToProps)
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {score, handleInputChange, handleStateChange } = this.props;
        console.log(this.props)
        return (
            <div style={{ position: 'fixed', height: '100%',  width: '100%', top: 0 } }>
                <div style={{height: '30vh', width: '100%', background:'#fff',display: 'flex', alignItems: 'center', justifyContent: 'center',} }>
                    top界面
                </div>
               <HomeTab score={score} handleInputChange={handleInputChange} handleStateChange={handleStateChange}></HomeTab>
               <div style={{height: '14vh', width: '100%', background:'#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',} }>
                    底部
                </div>
            </div>
        );
    }
}
//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        handleInputChange:(arg)=>dispatch(changeScore(arg)),
        handleStateChange:(arg) => dispatch(changeState(arg))
    }
}
export default Home;