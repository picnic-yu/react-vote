import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import React from 'react';
import Title from './title';
import Score from './score';
import Result from './result';
import ScoreForm from './scoreForm';
function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
const tabs = [
    { title: '一步一步' },
    { title: '现场评分' },
    { title: '迪凯尔医疗' },
];
const content = (props) =>{
    console.log(props)
    if(props.score.state == 1){
        return <ScoreForm score={props.score} handleInputChange={props.handleInputChange} handleStateChange={props.handleStateChange}></ScoreForm>
    }else if(props.score.state == 2){
        return <Score score={props.score} handleInputChange={props.handleInputChange} handleStateChange={props.handleStateChange}></Score>
    }else{
        return <Result ></Result>
    }
}
const HomeTab = (props) => (
    <div>
        <WhiteSpace />
        <StickyContainer>
        <Tabs tabs={tabs}
            initalPage={'t2'}
            renderTabBar={renderTabBar}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '46vh', backgroundColor: '#fff' }}>
            一步一步
            </div>
            <div style={{  height: '46vh', backgroundColor: '#fff' }}>
                <Title></Title>
                {
                    content(props)
                }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '46vh', backgroundColor: '#fff' }}>
            迪凯尔医疗迪凯尔医疗
            </div>
        </Tabs>
        </StickyContainer>
        <WhiteSpace />
    </div>
);
export default HomeTab;