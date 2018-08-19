// 现场互动
import React from 'react';
import { Row, Col, Button,Avatar,Spin } from 'antd';
import { BASE_URL} from 'src/util';
import './interaction.css';
import axios from 'axios';

const startIndex = window.location.href.indexOf('member');
const member =  window.location.href.slice(startIndex,startIndex+8).split('=')[1];
const renderList = (listArr) =>{
    listArr.map();
}

export default class Interaction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listArr:[],
            scoreLoading:false,
            wxuser:[]
        }
        this.handleShowScore = this.handleShowScore.bind(this);
    }
    componentDidMount(){
        axios.get(`${BASE_URL}/score/getWxUserList`).then( (response) =>  {
            if(response.data.code == 200 ){
                const wxuser= response.data.content;
                
                this.setState({
                    wxuser
                })
                console.log(wxuser)
            }else{
                
            }
            this.setState({scoreLoading:false});
        }).catch(function (error) {
            this.setState({scoreLoading:false});
            console.log(error);
        });
    }
    handleShowScore () {
        let scoreLoading = true;
        this.setState({scoreLoading});
        axios.post(`${BASE_URL}/score/getuser/member`, {member}).then( (response) =>  {
            if(response.data.code == 200 ){
                const listArr= response.data.content;
                
                this.setState({
                    listArr
                })
                console.log(listArr)
            }else{
                
            }
            this.setState({scoreLoading:false});
        }).catch(function (error) {
            this.setState({scoreLoading:false});
            console.log(error);
        });
        
    }
    render(){
        return(
            <div className="interaction">
                <Row gutter={16}>
                    
          
            
                        <Col className="left" span={12}>
                            <Spin spinning={this.state.scoreLoading}>
                            <div className="btn-wrap">
                                <Button 
                                    onClick={this.handleShowScore}
                                    type="primary" 
                                    className="btn">评分公示</Button>
                            </div>
                            <div className="vote-content">
                                <div className="list">
                                {
            
                                    this.state.listArr.map( (item,index)=> {
                                        return (
                                            <div key = {item.headimgurl+index} style={{display: 'flex',padding:'5px'}}>
                                                <Avatar size='large' src={item.headimgurl}/>
                                                <span className='nickname'>{item.nickname}</span>
                                                <span className='score'>打出 {item.score} 分</span>
                                            </div>
                                        )})
                                    }
                                    
                                </div>
                            </div>
                            </Spin>
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
