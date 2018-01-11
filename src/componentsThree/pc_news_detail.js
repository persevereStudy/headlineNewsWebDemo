import 'antd/lib/row/style';
import 'antd/lib/col/style';
import 'antd/lib/back-top/style';
import React from "react";
import {Row,Col,BackTop} from 'antd';
import PCNewsImageBoloc from './pc_news_images_block';
import Comments from './common_comments';

export default class PCNewsDetail extends React.Component{
  constructor(){
    super();
    this.state = {
      newsItem:''
    }
  };

  componentDidMount() {
    var myFetchOptions = {
      method:'GET'
    };
    console.log(this.props.uniquekey);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.uniquekey,myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({
          newsItem:json
        });
        document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
      })
  }
  createMarkup(){
    return {
      __html:this.state.newsItem.pagecontent
    }
  }
  render(){
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={14} style={newsDetailStyle.container}>
            <div style={newsDetailStyle.articleContainer} dangerouslySetInnerHTML={this.createMarkup()}></div>
            <Comments uniquekey={this.props.uniquekey}/>
          </Col>
          <Col span={6}>
            <PCNewsImageBoloc count={6} type="guoji" width="400px" carTitle="国际头条" imageWidth="100px"/>
          </Col>
          <Col span={2}></Col>
        </Row>
        <BackTop/>
      </div>
    );
  }
}
const newsDetailStyle = {
  container:{

  },
  articleContainer:{

  }
}
