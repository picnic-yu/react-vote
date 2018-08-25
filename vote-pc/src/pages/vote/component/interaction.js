// 现场互动
import React from 'react';
import { Row, Col, Button,Avatar,Spin,Radio } from 'antd';
import { BASE_URL} from 'src/util';
import './interaction.css';
import axios from 'axios';
const RadioGroup = Radio.Group;

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
            value: null,
            allUserList:[],//所有用户
            luckyLoading:false
        }
        this.handleShowScore = this.handleShowScore.bind(this);
        this.handleDraw = this.handleDraw.bind(this);
    }
    onChange = async (e) => {
        console.log('radio checked', e.target.value);
        const value = e.target.value
        await this.setState({
            value
        });
        this.handleShowScore();
    }
    componentDidMount(){

        this.handleShowScore();
        //获取所有投票者
        axios.get(`${BASE_URL}/score/getWxUserList`).then( (response) =>  {
            if(response.data.code == 200 ){
                
                this.setState({
                    allUserList:response.data.content
                })
            }else{
                
            }
            
        }).catch(function (error) {
           
            console.log(error);
        });
        //
        var speed=20;
        var list=document.getElementById('list');
        var list2=document.getElementById('list2');
        var rule=document.getElementById('rule');
        list2.innerHTML=list.innerHTML;
        function Marquee(){
            if(list2.offsetTop-rule.scrollTop<=0)
                rule.scrollTop-=list.offsetHeight;
            else{
                rule.scrollTop++;
            }
            if(list2.offsetTop-rule.scrollTop == 660){
                rule.scrollTop = 0;
            }
           
        }
        var MyMar=setInterval(Marquee,speed);
        rule.onmouseover=function() {clearInterval(MyMar)}
        rule.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
    }
    handleShowScore () {
        let scoreLoading = true;
        this.setState({scoreLoading});
        let memberValue = this.state.value;
        if(!memberValue){
            axios.post(`${BASE_URL}/score/getuser/list`, {}).then( (response) =>  {
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
        }else{
            axios.post(`${BASE_URL}/score/getuser/member`, {member:memberValue}).then( (response) =>  {
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
    }
    handleDraw(){
        
        let allUserList = this.state.allUserList;
        let wxuser = this.state.wxuser;
        // if(wxuser.length == 6){
        //     return 
        // }
        this.setState({luckyLoading:true});
        let arr = getArrItem(allUserList,1);
        if(arr.length){
            wxuser.push(arr[0]);
            let index = allUserList.indexOf(arr[0]);
            allUserList.splice(index,1);
        }
        this.setState({luckyLoading:false});
        this.setState({
            allUserList,
            wxuser
        })
        
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
                        <div style={{height: '60px', width: '100%',fontSize:'25px',display: 'flex', alignItems: 'center', justifyContent: 'center'} }>
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Radio value={1}>1号</Radio>
                                <Radio value={2}>2号</Radio>
                                <Radio value={3}>3号</Radio>
                                <Radio value={4}>4号</Radio>
                                <Radio value={5}>5号</Radio>
                                <Radio value={6}>6号</Radio>
                                <Radio value={0}>全部</Radio>
                            </RadioGroup>
                        </div>
                        
                        <div id="rule" className="vote-content">
                            <div className="list" id='list'>
                            <Row gutter={16}>
                                {
                                    this.state.listArr.map( (item,index)=> {
                                        return (
                                            <Col className="gutter-row" 
                                                span={12} 
                                                key = {item.nickname+index} 
                                                style={{display: 'flex',padding:'5px'}}>
                                                <div key = {item.headimgurl+index} style={{display: 'flex',padding:'5px',alignItems: 'center', justifyContent: 'center'}}>
                                                    <Avatar size='large' src={item.headimgurl}/>
                                                    <span title={item.nickname} className='nickname'>{item.nickname}</span>
                                                    <span className='score'> {item.member} 号： {item.score} 分</span>
                                                </div>
                                            </Col>
                                            
                                    )})
                                }
                
                            </Row>
                                
                            </div>
                            <div className="list2" id="list2"></div>
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
                            <div className='winner-wrap'>
                                <h1>中奖名单</h1>
                                <Row gutter={16}>
                                {
                                    
                                    this.state.wxuser.map( (item,index)=> {
                                        return (
                                            <Col className="gutter-row" 
                                                span={12} 
                                                key = {item.nickname+index} 
                                                style={{display: 'flex',padding:'5px'}}>
                                                <div className="gutter-box">
                                                    <Avatar size='large' src={item.headimgurl}/>
                                                    <span style={{marginLeft:'5px'}}
                                                    className='nickname_winner'>
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
