import React from 'react';
import { Button } from 'antd-mobile';
export default class Score extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            score:''
        }
    }
    handleStateChange(v){
        this.props.handleStateChange(v)
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
                        85分
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