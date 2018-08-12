// 现场互动
import React from 'react';
import { Row, Col, Button,Avatar } from 'antd';
import './interaction.css';
const listArr = [
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },{
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    },
    {
        url:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        name:'skjjsksh',
        score:58
    }
];
const renderList = (listArr) =>{
    listArr.map();
}
export default class Interaction extends React.Component {
    render(){
        return(
            <div className="interaction">
                <Row gutter={16}>
                    
                    <Col className="left" span={12}>
                        <div className="btn-wrap">
                            <Button type="primary" className="btn">Primary</Button>
                        </div>
                        <div className="vote-content">
                            <div className="list">
                            {
        
        
                                listArr.map( (item,index)=> {
                                    return (
                                        <div key = {item.url+index} style={{display: 'flex',padding:'5px', alignItems: 'center', justifyContent: 'center'}}>
                                            <Avatar size='large' src={item.url}/>
                                            <span>{item.name}</span>
                                            <span>打出 {item.score} 分</span>
                                        </div>
                                    )})
                                }
                                
                            </div>
                        </div>
                    </Col>
                    <Col className="right" span={12}>
                        <div className="btn-wrap">
                            <Button type="primary" className="btn">Primary</Button>
                        </div>
                        <div className="image-wrap">
                            <div className="image-content"></div>
                        </div>
                        <div className='winner-wrap'>
                            <h1>333</h1>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={8}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={8}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                                <Col className="gutter-row" span={8}>
                                    <div className="gutter-box">col-6</div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row> 
            </div>   
        )
    }
};
