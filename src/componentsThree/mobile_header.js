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
const createForm = Form.create;


export default class MobileHeader extends React.Component {
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

  setmodalVisible(value) {
    this.setState({
      modalVisible: value,
    })
  }

  handleClick(e) {
    if (e.key == "register") {
      this.setState(
        {
          current: 'register'
        });
      this.setmodalVisible(true);
    } else {
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
      method: 'GET'
    };
    var formData = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_username=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        console.log(json.NickUserName);
      this.setState({
        userNcikName: json.NickUserName,
        userid: json.UserId,
      })
    })
    if(this.state.action=="login"){
      this.setState({hasLogined:true});
    }
    message.success("请求成功！");
    this.setmodalVisible(false);
  }

  login() {
    this.setmodalVisible(true);
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

  render() {
    const {getFieldProps} = this.props.form;
    const userShow = this.state.hasLogined ?
      <Link to="/">
        <Icon style = {headerStyle.register} type="inbox"/>
      </Link> :
      <Icon type="setting" style = {headerStyle.register} onClick={this.login.bind(this)}/>
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
    };
    return (
      <div style={headerStyle.header_div}>
        <header style={headerStyle.header}>
          <img style={headerStyle.logo_img} src="./src/images/logo.png" alt="logo"/>
          <span style={headerStyle.logo_span}>ReactNew</span>
          {userShow}
        </header>
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
                  <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps("r_confirmPassword")}/>
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )

  }
}

MobileHeader = createForm()(MobileHeader);
const headerStyle = {
  header_div: {
    flex: 1,
    background: "#f6f6f6"
  },
  header: {
    borderBottom: "1px",
    borderBottomColor: "#2db7f5",
    borderBottomStyle: "solid",
    paddingLeft: "10px"
  },
  // logo: {
  //   alignItems: 'center',
  //   display: 'flex',
  // },
  logo_img: {
    height: '50px',
  },
  logo_span: {
    fontSize: '35px',
    verticalAlign: "top",
    paddingLeft: '5px',
    color: "#2db7f5"
  },
  register:{
    fontSize:"25px",
    float:"right",
    marginRight:"8px",
    marginTop:"15px",
    color:"#2db7f5"
  }
}



