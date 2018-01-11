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
import 'antd/lib/upload/style';
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
  notification,
  Upload
} from 'antd';
import {Link} from 'dva/router';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const {Header} = Layout;
const createForm = Form.create;

export default class PCUserCenter extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      commentsList:'',
      usercollection: '',
      previewImage: '',
      previewVisible: false
    };
  }

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({
          usercollection: json
        })
        // document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
      })
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({
          commentsList: json
        })
        // document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
      })
  }

  render() {
    const props = {
      action: 'http://newsapi.gugujiankong.com/handler.ashx',
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      listType: 'picture-card',
      defaultFileList: [
        {
          uid: -1,
          name: 'xxx.png',
          state: 'done',
          url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
          thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
        }
      ],
      onPreview: (file) => {
        this.setState({previewImage: file.url, previewVisible: true});
      }
    };
    var {usercollection,commentsList} = this.state;
    var usercollectionList = usercollection.length ?
      usercollection.map((uc, index) => (
        <Card key={index} title={uc.uniquekey} extra={<Link to={`/details/${uc.uniquekey}`}>查看</Link>}>
          <p>{uc.Title}</p>
        </Card>
      ))
      :
      "您还没有收藏任何的新闻，快去收藏一些新闻吧";
    var userCommentsList = commentsList.length?
      commentsList.map((comment,index) => (
        <Card key={index} title={'您于'+comment.datetime+'评论了文章'+comment.uniquekey} extra={<Link to={`/details/${comment.uniquekey}`}>查看</Link>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      :
      "您还没有评论过任何的新闻，快去查看一些新闻吧";
      ;
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20}><Tabs>
            <TabPane tab="我的收藏列表" key="1">
              {usercollectionList}
            </TabPane>
            <TabPane tab="我的评论列表" key="2">
              {userCommentsList}
            </TabPane>
            <TabPane tab="头像设置" key="3">
              <div style={{marginTop: "20px"}}>
                <Upload {...props}>
                  <Icon type="plus"></Icon>
                  <div>上传照片</div>
                </Upload>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="预览" src={this.state.previewImage}/>
                </Modal>
              </div>
            </TabPane>
          </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>

      </div>
    )
  }
}
