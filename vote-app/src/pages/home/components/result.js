import React from 'react';

export default class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            score:''
        }
    }
    render(){
        return(
            <div style={{ height: '30vh', width:"70%",margin: "0 auto",border:'1px solid #108ee9',padding:'6vh 0', textAlign: 'center',  borderRadius:'5px' }}>
                <p>感谢您的评分</p>
                <p>稍后会有抽奖环节</p>
                <p>祝您好运</p>
            </div>
        );
    }
}