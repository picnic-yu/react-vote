import React from 'react';
import { Button, Toast } from 'antd-mobile';
import axios from 'axios';
import BASE_URL from '../../../api/config';
import {getCookie} from '../../../util';
export default class Score extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            score:''
        }
    }
    handleStateChange(v){
        if(v == 1){
            return this.props.handleStateChange(v);
        }
        const openid = getCookie('openid');
        const nickname = getCookie('nickname');
        const headimgurl = getCookie('headimgurl');
        const member = getCookie('member');
        const score = this.props.score.score;
        axios.post(`${BASE_URL}/score/create`, {score,nickname,openid,headimgurl,member}).then( (response) =>  {
            if(response.data.code == 200 ){
                Toast.success('成功打分', 2);
                this.props.handleStateChange(v);
            }else if (response.data.code == 100){
                Toast.fail("您已经对该成员打分了", 2);
            }else{
                Toast.fail("操作失败", 2);
            }
        }).catch(function (error) {
            console.log(error);
        });
        
    }
    render(){
        const {score,  handleStateChange } = this.props;
        return(
            <div style={{ height: '30vh', width:"70%",margin: "0 auto",border:'1px solid #108ee9', borderRadius:'5px' }}>
                <div style={{ height: '20vh', width:"70%",margin: "0 auto", }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%',  }}>
                        您给操作者的评分为
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%', fontSize:'18px' }}>
                        {score.score}分
                    </div>
                </div>
                <div style={{ height: '10vh', width:"70%",margin: "0 auto", }}>
                    <div style={{ width:'50%',display:'inline-block',padding:'0 3px'}}>
                        <Button type="primary" size="small" onClick={() => {this.handleStateChange(1)}}>重新打分</Button>
                    </div>
                    <div style={{ width:'50%',display:'inline-block',padding:'0 3px'}}>
                        <Button type="primary" size="small" onClick={() => {this.handleStateChange(3)}}>确认提交</Button>
                    </div>
                    
                </div>
            </div>
        );
    }
}