

import React from 'react';
import '../style/step.css'
export default class Step extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='stepWrap'>
                <img style={{height: '100%', width: '100vw'} } src='http://new.szdtb.com/image/step-logo.png' />
                
                <p className='step-title'>中华口腔医学会</p>
                <p className='step-title'>第20次全国口腔医学学术会议</p>
                <p className='step-title'>2018中国国际口腔设备器材博览会（CDS）</p>
                <p className='step-title'>一步一步做好全瓷冠牙体预备<span className=' redColor'>&</span> </p>
                <p className='step-title'>一步一步做好护理四手操作</p>
                <h3 className ='title'>“一步一步”是什么？</h3>
                <p className='des'>临床规范化体验区，一步一步操作班，顾名思义，就是：专家一步一步的进行规范化操作演示，学员一步一步跟随操作。当然，实操之前少不了操作规范以及操作技巧的讲解。除了“一步一步”系列，现场还有“让我们一起CADCAM”，以及“牙体制备技术推荐与体验”等临床实用现场操作体验课程，全方位满足广大口腔医师的实操需求。</p>
                <h3 className ='title'>通过操作班的学习能得到什么？</h3>
                <p className='des'>专家现场指导，掌握最实用的技巧和要点，体验最前沿的产品，还能获得国家级I类继续医学教育学分8分。</p>
                <div className='left'>
                    <img style={{ width: '100%'} } src='http://new.szdtb.com/image/tan.png' />
                </div>
                <div className='right'>
                    <p>谭建国教授</p>
                    <p>北京大学口腔医学院修复科教授</p>
                    <p>主任医师，博士生导师</p>
                    <p>中华口腔医学会继续教育部部长</p>
                    <p>中华口腔医学会口腔美学专业委员会主任委员</p>
                    <p>中华口腔医学会口腔修复学专业委员会常委</p>
                </div>
                
                <p className='step-title'><span className=' redColor'>（全瓷冠）</span></p>
                <p className='step-title'>时间：8月29日下午、8月30日</p>
                <p className='step-title'>全天 9:30-12:00 14:00-16:30</p>
                <p className='step-title'>12人/场（1医1护，两人一组）</p>
                <p className='step-title'>每半天1场，共3场</p>
                <p className='step-title'>内容相同会员免费操作</p>
                <p className='step-title'><span className=' redColor'>（全瓷贴面）</span></p>
                <p className='step-title'>时间：8月31日全天 </p>
                <p className='step-title'>9:30-12:00 14:00-16:30</p>
                <p className='step-title'>12人/场（1医1护，两人一组）</p>
                <p className='step-title'>每半天1场，共2场内容相同</p>
                <p className='step-title'>会员免费操作</p>
                <p className='step-title'>地点：国家会展中心（上海）会场20（5.2馆•操作演示）</p>
                <p className='step-title'>
                    <a href='https://mp.weixin.qq.com/s?__biz=MjM5NTYzNTgwMA==&mid=2651929463&idx=2&sn=b4255ca3b1982ea099ce932667315c32&chksm=bd10ec408a6765563290b44a2d131e1df15affc0d67822bde2f3c8dee272403d484d76c5b446&mpshare=1&scene=1&srcid=0814pwbAbi8vffKZEEbvomZs&key=62369a1ccc4907a98c5ff71490a01580d3ebe99510091fe59721108e1a6f770fbbc3eeb907905e397d863e8f295c5651deab53b0cd7533ebf1f15f0c419186c7846f2ddaf1e806bd3cd838e37c606526&ascene=1&uin=MTExMjY2MDc2MQ%3D%3D&devicetype=Windows+10&version=61020020&lang=zh_CN&pass_ticket=LOCs2x5ZRm6x7r2Aj6ykX66ZPHR82fKTxgrctbdvAm9VBznJhE1mWXLHsh%2FpuoFx'>更多详情请点击（超链接）</a>
                </p>
            </div>
        );
    }
}