import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class ScoreBar extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
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
               
                data: ['现场评分平均分', '设备评分','专家评分'],
                // 默认选中状态
                selected: {
					'现场评分平均分': true,
					'设备评分': false,
					'专家评分': false
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
                data: ['1号','2号','3号','4号','5号','6号'],
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
                    name: '现场评分平均分',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [70, 80, 60, 90, 88, 90,]
                },
                {
                    name: '设备评分',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [90, 85, 88, 75, 90, 82]
                },
                {
                    name: '专家评分',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    data: [68, 75, 66, 75, 80, 85]
                }
            ]
        };
        myChart.setOption(option);
        window.onresize = myChart.resize
    }
    render() {
        return (
            <section>
                <div style={{height: '50px', width: '100%', fontSize:'22px',display: 'flex', alignItems: 'center', justifyContent: 'center',} }>
                    艾知星设备评分占25%,现场评分平均分占25%,专家评分占50%
                </div>
                <div id="main" style={{ width: '600px', height: '600px',margin:'0 auto' }}></div>
            </section>
        );
    }
}
export default ScoreBar;