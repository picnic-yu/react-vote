import React from 'react';
import HomeTab from './components/tabs';
import {  connect } from 'react-redux';
import {changeScore,changeState} from '../../redux/score/index';
import {getOpenId, getUrlParams, setCookie,getCookie} from '../../util';
import BASE_URL from '../../api/config';
import axios from 'axios';
import { setTimeout } from 'timers';
const appid = 'wx7cdd5e1b8c037a66';
let local = window.location.href;
// const member = getUrlParams('code');
const code = getUrlParams('code');
let redirect_uri = encodeURIComponent(local)
let userInfo = {};
function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    } 
let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
if(code == null || code ==''){
    const startIndex = window.location.href.indexOf('member');
    var member =  parseInt(window.location.href.slice(startIndex,startIndex+9).split('=')[1]);
    setCookie('member',member);
    window.location.href = url;
    
}else{
    axios.get(`${BASE_URL}/get_wx_access_token/${code}`).then((response)=> {
        // // 调试用
      
        // //新建一个div元素节点

        // var div=document.createElement("div");
        
        // div.innerText = JSON.stringify(response.data);
        // //插入到最前面
        // document.body.insertBefore(div, document.body.firstElementChild);
        if(response.data.code == 200){
            setCookie('nickname',response.data.content.nickname);
            setCookie('openid',response.data.content.openid);
            setCookie('headimgurl',response.data.content.headimgurl);
        }
        // 调试用
    })
    
}
//定义组件
@connect(state=> {
    return { score: state.score }
},mapDispatchToProps)
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){

    }
    render() {
        const {score, handleInputChange, handleStateChange } = this.props;
        console.log(this.props)
        return (
            // <div></div>
            <div style={{ position: 'fixed', height: '100%',  width: '100%', top: 0,overflowY:'auto' } }>
                <div style={{ width: '100%', background:'#fff',display: 'flex', alignItems: 'center', justifyContent: 'center',} }>
                    <img  style={{ width: '100%'}}src='http://new.szdtb.com/image/kaidier-bg.jpg' />
                </div>
               <HomeTab score={score} handleInputChange={handleInputChange} handleStateChange={handleStateChange}></HomeTab>
               <div style={{ width: '100%', color:'#fff',background:'#1B7FA0',textAlign:'center',padding:'5px 0'} }>
                    <p style={{margin:'.5vh 0'}}>活动最终解释权</p>
                    <p style={{margin:'.5vh 0'}}>归苏州迪凯尔医疗科技有限公司所有</p>
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