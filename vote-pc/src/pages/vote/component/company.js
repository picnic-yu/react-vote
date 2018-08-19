import React from 'react';
import './company.css'
export default class GuideWrap extends React.Component {
    render(){
        return (
            <div className='company'>
                <div className='product'>
                    <img style={{height: '400px', width: '100%'} } src='http://new.szdtb.com/image/company.png' />
                    <p className='companyDec'>苏州迪凯尔医疗科技有限公司坐落于江苏苏州工业园区生物纳米园内，是一家专业从事医疗领域内计算机软硬件、手术导航设备及相关产品的研发与销售的高新技术企业。</p>
                    <p className='companyDec'>公司拥有一支由口腔医学、光学定位、图形图像处理、网络云技术等领域高尖技术人才团队，并拥有完全的自主知识产权。公司发展目标是让医生在学习、诊断、治疗过程中看得更多，做得更细，操作更方便。</p>
                    <h3 style={{textAlign:'center',fontSize:'30px'}}>艾知星—数字化口腔虚拟教学评估系统</h3>
                    <p className='companyDec'>迪凯尔数字化口腔虚拟教学评估系统，提供了一个全新的口腔教学训练平台。系统内置牙冠、窝洞和开髓等相关基础教学课程，规范化指导学生在仿真头模上进行技能训练。
                        系统运用三维虚拟及红外定位技术，实时定位器械及牙模空间位置，即时评估牙体制备情况，给予学生针对性指导，从而提升临床技能及教学效率。
                    </p>
                    <img style={{height: '400px', width: '100%'} } src='http://new.szdtb.com/image/equipment.png' />
                    <p className='companyDec'>该系统可为学校、医院、诊所等口腔专业人员提供示教、临床训练、考试等操作服务，并可搭建交互式教学网络，实现学生自主训练，教师实时监测、指导，远程教学等功能。</p>
                    
                    <div className='scan'>
                        <img style={{height: '430px', width: '100%'} } src='http://new.szdtb.com/image/scan.png' />
                    </div>
                    <p style={{textAlign:'center'}}>更多精彩 请移步至本展厅D24-D30展位</p>
                    <img style={{height: '400px', width: '100%',marginBottom:'5px'} } src='http://new.szdtb.com/image/display1.png' />
                    <img style={{height: '400px', width: '100%'} } src='http://new.szdtb.com/image/display2.png' />
                </div>
            </div>
        );
    }
}