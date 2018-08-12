import React from 'react';
import { Row, Col } from 'antd';
import './guide.css';
export default class GuideWrap extends React.Component {
    render(){
        return (
            <div >
                <Row gutter={16} className='content'>
                    <Col  span={6}>
                        <div className='item'>col-6</div>
                    </Col>
                    <Col  span={6}>
                        <div className='item'>col-6</div>
                    </Col>
                    <Col  span={6}>
                        <div className='item'>col-6</div>
                    </Col>
                    <Col  span={6}>
                        <div className='item'>col-6</div>
                    </Col>
                </Row>
                <Row gutter={16} className="bottom-wrap">
                    <Col className="bottom-text" span={6}>
                        <div >打开手机蓝牙</div>
                    </Col>
                    <Col className="bottom-text" span={6}>
                        <div >打开微信摇一摇</div>
                    </Col>
                    <Col className="bottom-text" span={6}>
                        <div >显示周边</div>
                    </Col>
                    <Col className="bottom-text" span={6}>
                        <div >使劲摇晃你的手机进入评分界面</div>
                    </Col>
                </Row>
                <div className="des">
                    如果无法摇出界面,请联系现场工作人员
                </div>
            </div>
        );
    }
}