import React from 'react';
import { Button } from 'antd';
import { Layout } from 'antd';
import VoteTabs from './component/tabs';

const { Header, Footer, Sider, Content } = Layout;
//定义组件
class Vote extends React.Component{
    render() {
        
        return (
            <div style={{background:'#e9e9e9'}}>
                <div className='topWrap' style={{ width: '100%', background:'#fff',display: 'flex', alignItems: 'center', justifyContent: 'center',} }>
                    <img style={{height: '100%', width: '100%'} } src='http://new.szdtb.com/image/kaidier-bg.jpg' />
                </div>
                <div style={{ width: '100%', background:'#fff'} }>
                    <VoteTabs></VoteTabs>
                </div>
                <div style={{height: '60px', width: '100%',fontSize:'25px',color:'#fff', background:'#1B7FA0',display: 'flex', alignItems: 'center', justifyContent: 'center'} }>
                    活动最终解释权归苏州迪凯尔医疗科技有限公司所有
                </div>
            </div>
        );
    }
}



export default Vote;