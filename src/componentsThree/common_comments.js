'use strict'
import 'antd/lib/menu/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/form/style';
import 'antd/lib/modal/style';
import 'antd/lib/tabs/style';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import 'antd/lib/card/style';
import 'antd/lib/notification/style';
import React from 'react';
import {
  Layout,
  Row,
  Col,
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  CheckBox,
  Modal,
  Card,
  notification
} from 'antd';
import {Link} from 'dva/router';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const {Header} = Layout;
const createForm = Form.create;

export default class Comments extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      comments: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    };
    var formdata = this.props.form.getFieldValue("remark");
    // console.log("我要提交的数据"+formdata);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&comment=" + formdata, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.componentDidMount();
      })
  }

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    // console.log(this.props.uniquekey);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({
          comments: json
        });
      })
  }

  addUserCollection() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        //收藏成功以后进行一下全局的提醒
        notification['success']({message: 'ReactNew提醒', description: '收藏此文章成功'})
      })
  }

  render() {
    const {getFieldProps} = this.props.form;
    const {comments} = this.state;
    // console.log("评论列表"+comments);
    const commentList = comments.length != 0 ?
      comments.map((comment, index) =>
        <Card key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime}</a>}>
          <p>{comment.Comments}</p>
        </Card>)
      :
      "没有加载到任何评论";
    return (
      <div style={commontsStyle.comment}>
        <Row>
          <Col span={24}>
            {commentList}
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="您的评论">
                <Input type="textarea" placeholder="随便写" {...getFieldProps('remark', {initialValue: ''})}/>
              </FormItem>
              <Button type="primary" htmlType="submit">提交评论</Button>&nbsp;&nbsp;
              <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
Comments = createForm()(Comments);
const commontsStyle = {
  comment: {},
}
