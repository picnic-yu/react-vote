import React, { Component } from 'react';
import { Spin } from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import axios from 'axios';
import { BASE_URL} from 'src/util';
const asyncAction = (url) => {
    return new Promise((resolve,reject) => {
        axios.get(`${BASE_URL}${url}`).then( (response) =>  {
            if(response.data.code == 200 ){
                let data = [];
                response.data.content.forEach((item)=>{
                    data.push((item.avg*.25).toFixed(2));
                });
                resolve(data);
            }
        }).catch( (error) =>  {
            console.log(error);
        });
    })
}
const getOtherScoreAction = (url) => {
    return new Promise((resolve,reject) => {
        axios.get(`${BASE_URL}${url}`).then( (response) =>  {
            if(response.data.code == 200 ){
                resolve(response.data.content);
            }
        }).catch( (error) =>  {
            console.log(error);
        });
    })
}
class ScoreBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            chartLoading:false
        }
    }
    async componentDidMount() {
        this.setState({
            chartLoading:true
        });
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        var expert_score = [68, 75, 66, 75, 80, 85,90, 85, 88, 75, 90, 82];                           //专家
        var computer_score = [90, 85, 88, 75, 90, 82,90, 85, 88, 75, 90, 82];//设备
        const averageScore = await asyncAction('/score/getAverage') ||  [70, 80, 60, 90, 88, 90,70, 80, 60, 90, 88, 90]; //平均分
        const otherScore = await getOtherScoreAction('/otherscore/getAverage');
        if(otherScore){
            computer_score = otherScore.computer_scoreArr;
            expert_score = otherScore.expert_scoreArr;
        }
        this.setState({
            chartLoading:false
        });
        // 绘制图表
        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            animation:true,
            legend: {
               
                data: ['现场评分平均分占25%', '设备评分占25%','专家评分占50%'],
                // 默认选中状态
                selected: {
					'现场评分平均分占25%': true,
					'设备评分占25%': false,
					'专家评分占50%': false
                },
                top:20
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'category',
                data: ['1号','2号','3号','4号','5号','6号','7号','8号','9号','10号','11号','12号'],
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false
                }
            },
            yAxis: {
                type: 'value',
                show:false
            },
            series: [
                {
                    name: '现场评分平均分占25%',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: averageScore
                },
                {
                    name: '设备评分占25%',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: computer_score
                },
                {
                    name: '专家评分占50%',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: expert_score
                }
            ]
        };
        myChart.setOption(option);
        window.onresize = myChart.resize
    }
    render() {
        return (
            <section>
                <Spin spinning={this.state.chartLoading}>
                    
                    <div id="main" style={{ width: '600px', height: '600px',margin:'0 auto' }}></div>
                </Spin>
            </section>
        );
    }
}
export default ScoreBar;