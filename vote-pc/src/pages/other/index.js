import React from 'react';
import { Form, InputNumber , Button, Checkbox,Spin,message,Select } from 'antd';
import { BASE_URL} from 'src/util';
import axios from 'axios';
const Option = Select.Option;
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
};
class Other extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checkNick: false,
            member:null,
            expert_score:null,
            computer_score:null,
            loading:false
        };
    }
    
    check = () => {
        this.props.form.validateFields(
          (err) => {
            if (!err) {
                this.setState({
                    loading:true
                })
                axios.post(`${BASE_URL}/otherscore/create`, this.state).then( async (response) =>  {
                    if(response.data.code == 200 ){
                       
                        const computer_score = null;
                        const expert_score = null;
                        const member = null;
                        await this.setState({
                            computer_score,
                            expert_score,
                            member
                        });
                        this.props.form.resetFields();
                        message.success('保存成功');
                    }else{
                        message.error('保存失败');
                    }
                    
                    this.setState({loading:false});
                }).catch(function (error) {
                    this.setState({loading:false});
                    message.error('保存失败');
                    console.log(error);
                });


            }
          },
        );
    }
    computer_scoreChange = async (value) => {
        const computer_score = value;
        await this.setState({
            computer_score
        });
        
    }
    expert_scoreChange = async (value) => {
        const expert_score = value;
        await this.setState({
            expert_score
        });
    }
    onChange = async (value) => {
        console.log(value)
        const member = value
        await this.setState({
            member
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <div style={{height: '60px', margin:'10px 0',width: '100%',fontSize:'25px', display: 'flex', alignItems: 'center', justifyContent: 'center'} }>
                    专家打分和设备打分录入
                </div>
                <Spin spinning={this.state.loading}>
                    <div>
                        <FormItem {...formItemLayout} label="选手">
                            {getFieldDecorator('member', {
                                rules: [{
                                    required: true,
                                    message: '请选择选手',
                                }],
                            })(
                                <Select  style={{ width: '100%' }} onChange={this.onChange}>
                                    <Option value={1}>1号</Option>
                                    <Option value={2}>2号</Option>
                                    <Option value={3}>3号</Option>
                                    <Option value={4}>4号</Option>
                                    <Option value={5}>5号</Option>
                                    <Option value={6}>6号</Option>
                                    <Option value={7}>7号</Option>
                                    <Option value={8}>8号</Option>
                                    <Option value={9}>9号</Option>
                                    <Option value={10}>10号</Option>
                                    <Option value={11}>11号</Option>
                                    <Option value={12}>12号</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="设备分数">
                            {getFieldDecorator('username', {
                                rules: [{
                                    required: true,
                                    message: '请输入设备分数',
                                }],
                            })(
                                <InputNumber style={{width:'100%'}} min={0} max={100}  onChange={this.computer_scoreChange} />,
                                
                            )}
                        </FormItem>
                        
                        <FormItem {...formItemLayout} label="专家分数">
                            {getFieldDecorator('nickname', {
                                rules: [{
                                    required: true,
                                    message: '请输入专家分数',
                                }],
                            })(
                                <InputNumber min={0} max={100} style={{width:'100%'}} onChange={this.expert_scoreChange} />,
                                
                            )}
                        </FormItem>
                    
                        <FormItem {...formTailLayout}>
                            <Button type="primary" onClick={this.check}>
                                提交
                            </Button>
                        </FormItem>
                    </div>
                </Spin>
            </div>
        )
    }
}

const WrappedDynamicRule = Form.create()(Other);
export default WrappedDynamicRule;