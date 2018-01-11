'user strict'
import 'antd/lib/card/style';
import React from 'react';
import {Card} from 'antd';
import {Link} from 'dva/router';

export default class PCNewsImageBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news: ''
    }
  }

  componentWillMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({news: json})
      })
  }

  render() {
    const blockStyle = {
      topNewsList: {
        lineHeight: "22px",
        color: "#666",
        marginTop:"5px",
      },
      imageblocks: {
        float: "left",
        marginRight:"5px",
      },
      custom_image:{

      },
      custom_card:{

      },
      styleImage:{
        display:"block",
        width:this.props.imageWidth,
        height:"90px"
      },
      styleH3:{
        width:this.props.imageWidth,
        whiteSpace:"nowrap",
        overflow:"hidden",
        textOverflow:"ellipsis"
      }
    }
    const {news} = this.state;
    const newList = news.length != 0 ? news.map((newsItem, index) => (
        <div key={index} style={blockStyle.imageblocks}>
          <Link to={'details/${newsItem.uniquekey}'} target="_blank">
            <div style={blockStyle.custom_image}>
              <img alt="" style={blockStyle.styleImage}src={newsItem.thumbnail_pic_s}/>
            </div>
            <div style={blockStyle.custom_card}>
              <h3 style={blockStyle.styleH3}>{newsItem.title}</h3>
              <p>{newsItem.author_name}</p>
            </div>
          </Link>
        </div>
      )) :
      '没有加载到任何新闻';
    return (
      <div style={blockStyle.topNewsList}>
        <Card title={this.props.carTitle} bordered={true} style={{width: this.props.width}}>
          {newList}
        </Card>
      </div>
    )
  }
}


