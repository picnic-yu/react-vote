import { Tabs } from 'antd';
import React from 'react';
import ScoreBar from './charts';//成绩公布
import GuideWrap from './guide'; //打分指南
import Interaction from './interaction';    //现场互动
import Company from './company';
import Step from './step';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}
export default class VoteTabs extends React.Component {
    constructor(props){
        super(props);
        this.state={
            activeTab:'1'
        }
        this.handleChangeKey = this.handleChangeKey.bind(this)
    }
    handleChangeKey(key){
        const activeTab = key;
        this.setState({
            activeTab
        });
    }
    render(){
        return (
            <Tabs size='large' defaultActiveKey="1" onChange={this.handleChangeKey}>
                <TabPane forceRender={true} tab="一步一步" key="1">
                    <Step></Step>
                </TabPane>
                <TabPane tab="打分指南" key="2">
                <GuideWrap></GuideWrap>
                </TabPane>
                <TabPane tab="成绩公布" key="3">
                    {
                        this.state.activeTab == '3' ? <ScoreBar></ScoreBar> : null
                    }
                    
                </TabPane>
                <TabPane tab="现场互动" key="4">
                    <Interaction></Interaction>
                </TabPane>
                <TabPane tab="迪凯尔医疗" key="5"><Company></Company></TabPane>
            </Tabs>
        );
    }
}
