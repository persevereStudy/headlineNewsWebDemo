'user strict'
import 'antd/lib/card/style';
import React from 'react';
import {Card} from 'antd';
import {Link} from 'dva/router';

export default class PCNewsBlock extends React.Component {
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
        this.setState({news: json})})
  }

  render() {
    const {news} = this.state;
    const newList = news.length!=0 ? news.map((newsItem, index) => (
        <li key={index}><Link to={`details/${newsItem.uniquekey}`} target="_blank">{newsItem.title}</Link></li>
      )) :
      '没有加载到任何新闻';
    return (
      <div style={blockStyle.topNewsList}>
        <Card>
          <ul>
            {newList}
          </ul>
        </Card>
      </div>
    )
  }
}

const blockStyle = {
  topNewsList: {
    lineHeight: "22px",
    color: "#666"
  },

}
