import React from 'react';
import { Button, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
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
        this.props.handleStateChange(2)
    }
    render(){
        const { getFieldProps } = this.props.form;
        const {score, handleInputChange, handleStateChange } = this.props;
        return(
            <div style={{ height: '30vh', width:"70%",margin: "0 auto",}}>
                <div style={{ height: '13vh', width:"80%",margin: "0 auto",border:'1px solid #108ee9', borderRadius:'5px'}}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%',  }}>
                        8月29日 下午
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50%', fontSize:'18px' }}>
                        1号操作者
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