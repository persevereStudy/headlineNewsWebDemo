'use strict'
import 'antd/lib/menu/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/form/style';
import 'antd/lib/modal/style';
import 'antd/lib/tabs/style';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import React from 'react';
import {Layout, Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal} from 'antd';
import {Link} from 'dva/router';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const {Header} = Layout;
const createForm = Form.create;

export default class PcHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      current: "top",
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNcikName: '',
      userid: 0
    }
  }

  componentWillMount() {
    if(localStorage.userid!=""){
      this.setState({hasLogined:true});
      this.setState({userNcikName:localStorage.userNcikName,userid:localStorage.userid})
    }
  }

  setmodalVisible(value) {
    this.setState({
      modalVisible: value,
    })
  }

  handleClick(e) {
    if(e.key=="register"){
      this.setState(
        {
          current:'register'
        });
      this.setmodalVisible(true);
    }else{
      this.setState(
        {
          current: e.key
        }
      )
    }
  }

  handleSubmit(e) {
    //页面开始提交API
    e.preventDefault();
    var myFetchOptions = {
      method:'GET'
    };
    var formData = this.props.form.getFieldsValue();
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
      +"&username="+formData.userName
      +"&password="+formData.password
      +"&r_username="
      +formData.r_userName
      +"&r_password="
      +formData.r_password
      +"&r_confirmPassword="
      +formData.r_confirmPassword,myFetchOptions).
      then(response => response.json()).
      then(json =>{
        localStorage.userid = json.UserId;
        localStorage.userNcikName = json.NickUserName;
        this.setState({
          userNcikName:json.NickUserName,
          userid:json.UserId,
        })
    })
    console.log("未改变前的"+this.state.action);
    if(this.state.action=="login"){
      this.setState({hasLogined:true});
      console.log(this.state.action);
    }
    message.success("请求成功！");
    this.setmodalVisible(false);
  }

  callback(e){
    if(e==1){
      this.setState({
        action:"login"
      })
    }else{
      this.setState({
        action:"register"
      })
    }
  }

  logout(){
    localStorage.userid = "";
    localStorage.userNcikName = "";
    this.setState({hasLogined:false});
  }

  render() {
    const {getFieldProps} = this.props.form;
    const userShow = this.state.hasLogined
      ?
      <Menu.Item key="logout" style={{float:"right"}} >
        <Button type="primary" htmlType="button" style={{width:"100px"}}>{this.state.userNcikName}</Button>
        &nbsp;&nbsp;
          <Button type="dashed" htmlType="button" style={{width:"100px"}}>
            <Link to={'/usercenter'}>个人中心</Link>
          </Button>
        &nbsp;&nbsp;
        <Button type="danger" htmlType="button" style={{width:"100px"}} onClick={this.logout.bind(this)}>
          退出
        </Button>
      </Menu.Item>

      :
      <Menu.Item key="register" style={{float:"right"}}>
        <Icon type="appstore"/>注册/登录
      </Menu.Item>
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
    };
    return (
      <div>
        <Header>
          <Row>
            <Col span={2}>
            </Col>
            <Col span={4}>
              <a href="/" className="logo" style={headerStyle.logo}>
                <img style={headerStyle.logo_img} src="./src/images/logo.png" alt="logo"/>
                <span style={headerStyle.logo_span}>ReactNews</span>
              </a>
            </Col>
            <Col span={16}>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={[this.state.current]}
                onClick={this.handleClick.bind(this)}
                >
                <Menu.Item key="top">
                  <Icon type="appstore"/>头条
                </Menu.Item>
                <Menu.Item key="shehui">
                  <Icon type="appstore"/>社会
                </Menu.Item>
                <Menu.Item key="guonei">
                  <Icon type="appstore"/>国内
                </Menu.Item>
                <Menu.Item key="guoji">
                  <Icon type="appstore"/>国际
                </Menu.Item>
                <Menu.Item key="yule">
                  <Icon type="appstore"/>娱乐
                </Menu.Item>
                <Menu.Item key="tiyu">
                  <Icon type="appstore"/>体育
                </Menu.Item>
                <Menu.Item key="keji">
                  <Icon type="appstore"/>科技
                </Menu.Item>
                <Menu.Item key="shishang">
                  <Icon type="appstore"/>时尚
                </Menu.Item>
                {userShow}
              </Menu>
              <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                     onCancel = {() => this.setmodalVisible(false)}
                     onOk={() => this.setmodalVisible(false)}
                     okText="关闭"
              >
                <Tabs defaultActiveKey = "1" type="card" onChange={this.callback.bind(this)}>
                  <TabPane tab="登录" key="1">
                    <Form horizontal = "true" onSubmit={this.handleSubmit.bind(this)}>
                      <FormItem label="账户" {...formItemLayout}>
                        <Input placeholder="请输入您的账号" {...getFieldProps("userName")}/>
                      </FormItem>
                      <FormItem  label="密码" {...formItemLayout}>
                        <Input type="password" placeholder="请输入您的密码" {...getFieldProps("password")}/>
                      </FormItem>
                      <Button type="primary" htmlType="submit">登录</Button>
                    </Form>
                  </TabPane>
                  <TabPane tab="注册" key="2">
                    <Form horizontal = "true" onSubmit={this.handleSubmit.bind(this)}>
                      <FormItem label="账户" {...formItemLayout}>
                        <Input placeholder="请输入您的账号" {...getFieldProps("r_userName")}/>
                      </FormItem>
                      <FormItem  label="密码" {...formItemLayout}>
                        <Input type="password" placeholder="请输入您的密码" {...getFieldProps("r_password")}/>
                      </FormItem>
                      <FormItem  label="确认密码" {...formItemLayout}>
                        <Input type="password"placeholder="请再次输入您的密码" {...getFieldProps("r_confirmPassword")}/>
                      </FormItem>
                      <Button type="primary" htmlType="submit">注册</Button>
                    </Form>
                  </TabPane>


                </Tabs>
              </Modal>
            </Col>
            <Col span={2}>
            </Col>
          </Row>
        </Header>
      </div>
    )

  }
}

PcHeader = createForm()(PcHeader);
const headerStyle = {
  logo: {
    alignItems: 'center',
    display: 'flex',
  },
  logo_img: {
    width: '48px',
    height: '48px'
  },
  logo_span: {
    fontSize: '24px',
    paddingLeft: '5px'
  },
  register: {},
  logout: {},
}



