import React from 'react';
import { Button } from 'antd';
import { Layout } from 'antd';
import VoteTabs from './component/tabs'
const { Header, Footer, Sider, Content } = Layout;
//定义组件
class Vote extends React.Component{
    render() {
        
        return (
            <div style={{background:'#e9e9e9'}}>
                <div style={{maxHeight: '400px',minHeight:'300px', width: '100%', background:'#fff',display: 'flex', alignItems: 'center', justifyContent: 'center',} }>
                    top
                </div>
                <div style={{maxHeight: '700px',minHeight:'650px', width: '100%', background:'#fff',marginTop:'10px'} }>
                    <VoteTabs></VoteTabs>
                </div>
                <div></div>
                <div style={{maxHeight: '300px',minHeight:'100px', width: '100%', background:'#fff',display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:'10px'} }>
                    footer
                </div>
            </div>
        );
    }
}



export default Vote;