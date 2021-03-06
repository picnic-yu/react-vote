import React from 'react';
import { Button, InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import {getCookie} from '../../../util';
var now = new Date();
var hour = now.getHours(); 
// let dayMoment = '上午';
var dayMoment = '上午';
if(hour < 12) {
    dayMoment = '上午';
}else{
    dayMoment = '下午';
}



class Score extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            score:''
        }
        this.handleStateChange = this.handleStateChange.bind(this);
    }
    handleScoreChange(v){
        this.props.handleInputChange(v);
    }
    handleStateChange(){
        var reg = new RegExp("^(\\d|[1-9]\\d|100)$");
        const value = this.props.score.score;
        if(!reg.test(value)) {
            Toast.fail("请输入0-100的整数", 2);
        }else{
            this.props.handleStateChange(2)
        }
        
    }
    render(){
        const { getFieldProps } = this.props.form;
        const {score, handleInputChange, handleStateChange } = this.props;
        const member = getCookie('member');
        
       
        const monthNumber = new Date().getMonth() + 1;
        const dayNumber = new Date().getDate();
        return(
            <div style={{ height: '32vh', width:"80%",margin: "0 auto",}}>
                <div style={{ height: '15vh', width:"80%",margin: "0 auto",border:'1px solid #108ee9', borderRadius:'5px'}}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%',  }}>
                        {monthNumber}月{dayNumber} 日{dayMoment}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%', fontSize:'18px' }}>
                        {member}号操作者
                    </div>
                </div>
                <div style={{  width:"80%",margin: "0 auto",padding:'10px 5px'}}>
                    <div style={{  border:'1px solid #108ee9', borderRadius:'2px'}}>
                        <InputItem
                            {...getFieldProps('digit')}
                            type="digit"
                            value={score.score}
                            onChange={(v) => { this.handleScoreChange(v); }}
                            placeholder="请在此处输入你的评分"
                        ></InputItem>
                    </div>
                
                </div>
                <div style={{  width:"80%",margin: "0 auto",padding:'10px 5px'}}>
                    <Button type="primary" size="small" onClick={this.handleStateChange}>提交</Button>
                </div>
            </div>
        );
    }
}
const BasicInputExampleWrapper = createForm()(Score);
export default BasicInputExampleWrapper