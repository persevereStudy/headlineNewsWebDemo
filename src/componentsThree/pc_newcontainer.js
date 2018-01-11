'use strict'
import 'antd/lib/menu/style';
import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/form/style';
import 'antd/lib/modal/style';
import 'antd/lib/tabs/style';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import 'antd/lib/carousel/style';
import React from 'react';
import {Layout, Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal, Carousel} from 'antd';
import {Link} from 'dva/router';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBoloc from './pc_news_images_block';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const {Header} = Layout;
const createForm = Form.create;

export default class PCNewsContainer extends React.Component {

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true,
    }
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} style={containerStyle.container}>
            <div style={containerStyle.leftContainer}>
              <div style={containerStyle.carousel}>
                <Carousel {...settings}>
                  <div><img src="./src/images/carousel_1.jpg"/></div>
                  <div><img src="./src/images/carousel_2.jpg"/></div>
                  <div><img src="./src/images/carousel_3.jpg"/></div>
                  <div><img src="./src/images/carousel_4.jpg"/></div>
                </Carousel>
              </div>
              <div><PCNewsImageBoloc count={6} type="guoji" width="400px" carTitle="国际头条" imageWidth="100px"/></div>
            </div>
            <Tabs style={containerStyle.tabsNews}>
              <TabPane tab="新闻" key="1">
                <PCNewsBlock   count={22} type="top" width="100%" bordered="false"/>
              </TabPane>
              <TabPane tab="国际" key="2">
                <PCNewsBlock count={10} type="guoji" width="100%" bordered="false"/>
              </TabPane>
            </Tabs>
            <div>
              <PCNewsImageBoloc  count={22} type="top" width="100%" carTitle="国内新闻" imageWidth="132px"/>
              <PCNewsImageBoloc count={9} type="yule" width="100%" carTitle="娱乐新闻" imageWidth="132px"/>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}
const containerStyle = {
  leftContainer: {
    width: "400px",
    float: "left"
  },
  container: {
    paddingTop: "10px",
  },
  carousel: {},
  tabsNews: {
    paddingLeft: "10px",
    width: "460px",
  }
}
