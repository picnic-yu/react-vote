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
/**
          从数组中随机抽取数据 2016-09-09
      **/
    function getArrItem(arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    }
export default class Interaction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listArr:[],
            scoreLoading:false,
            wxuser:[],
            luckyLoading:false
        }
        this.handleShowScore = this.handleShowScore.bind(this);
        this.handleDraw = this.handleDraw.bind(this);
    }
    componentDidMount(){
       this.handleShowScore();
    }
    handleShowScore () {
        let scoreLoading = true;
        this.setState({scoreLoading});
        axios.post(`${BASE_URL}/score/getuser/list`, {member}).then( (response) =>  {
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
    handleDraw(){
        // arr=[1,2,3,4,5,6,7,8,9];
        // i=0;
        // var t=setInterval('show()',2000);
        // function show() {
        //     console.log(i)
        //     i=i+1;
        //     //如果超过数组长度，清除定时器
        //     if(i>arr.length){
        //         clearInterval(t)
        //     }
        // }
        this.setState({luckyLoading:true});
        axios.get(`${BASE_URL}/score/getWxUserList`).then( (response) =>  {
            if(response.data.code == 200 ){
                const wxuser = getArrItem(response.data.content,6)
                
                this.setState({
                    wxuser
                })
                console.log(wxuser)
            }else{
                
            }
            this.setState({luckyLoading:false});
        }).catch(function (error) {
            this.setState({luckyLoading:false});
            console.log(error);
        });
    }
    render(){
        return(
            <div className="interaction">
         
                <Row >
                    
          
            
                    <Col className="interact_left" span={16}>
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
                                            <span className='score'> {item.member} 号选手 {item.score} 分</span>
                                        </div>
                                    )})
                                }
                                
                            </div>
                        </div>
                        </Spin>
                    </Col>
                
                    <Col className="interact_right" span={8}>
                        <Spin spinning={this.state.luckyLoading}>
                            <div className="btn-wrap">
                                <Button 
                                    onClick={this.handleDraw}
                                    type="primary" className="btn">现场抽奖</Button>
                            </div>
                            <div className="image-wrap">
                                <div className="image-content"></div>
                            </div>
                            <div className='winner-wrap'>
                                <h1>中奖名单</h1>
                                <Row gutter={16}>
                                {
                                    
                                    this.state.wxuser.map( (item,index)=> {
                                        return (
                                            <Col className="gutter-row" 
                                                span={8} 
                                                key = {item.nickname+index} 
                                                style={{display: 'flex',padding:'5px'}}>
                                                <div className="gutter-box">
                                                    <Avatar size='large' src={item.headimgurl}/>
                                                    <span style={{marginLeft:'5px'}}
                                                    className='nickname'>
                                                    {item.nickname}</span>
                                                </div>
                                            </Col>
                                        )})
                                    }
                                </Row>
                                <Row gutter={16}>
                                    
                                </Row>
                            </div>
                        </Spin>

                    </Col>
                </Row> 
            </div>   
        )
    }
};
