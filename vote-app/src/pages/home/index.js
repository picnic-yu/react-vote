import React from 'react';
import HomeTab from './components/tabs';
import {  connect } from 'react-redux';
import {changeScore,changeState} from '../../redux/score/index';
import {getOpenId, getUrlParams} from '../../util';
import {getUserInfo} from '../../api/vote'
const appid = 'wx7cdd5e1b8c037a66';
let local = window.location.href;
const code = getUrlParams('code');
let redirect_uri = encodeURIComponent(local)
let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
if(code == null || code ==''){
    window.location.href = url;
}else{
    getUserInfo(code);
}
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
                    top界面   {code}
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