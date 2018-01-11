"use strict";
import React from 'react';
import BodyChild from './bodyChild';
import PropTypes from 'prop-types';


export default class ComponentBody extends React.Component {
  //将要加载
  componentWillMount() {
    //定义你的逻辑即可
    console.log("Body-----componentWillMount");
  }

  //加载完毕
  componentDidMount() {
    console.log("Body---componentDidMount");
  }

  shouldComponentUpdate() {
    console.log("Body---shouldComponentUpdate")
    return true;
  }

  componentWillUpdate() {
    console.log("Body---componentWillUpdate")
  }

  componentDidUpdate() {
    console.log("Body---componentDidUpdate")
  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      username: 'JunKing',
      age: 20
    };
  }

  changeUserInfo(age) {
    this.setState({age: age});
    this.refs.submitButton.style.color='red';
  }

  handleChildValueChange(event) {
    this.setState({age: event.target.value})
  }

  render() {
    // setTimeout(() => {
    //   this.setState(this.state.username === 'JunKing' ? {
    //     username: 'King',
    //     age: ++this.state.age
    //   } : {username: 'JunKing', age: ++this.state.age})
    // }, 4000);
    return (
      <header>
        <div>
          <h1>这里是主体</h1>
          <p>{this.state.username},{this.state.age},{this.props.userid},{this.props.sex}</p>
          <BodyChild  {...this.props} handleChildValueChange={this.handleChildValueChange.bind(this)}/>
          <input ref="submitButton" type="button" value="提交" onClick={this.changeUserInfo.bind(this,99)}/>
        </div>
      </header>
    )
  }
}

ComponentBody.propTypes = {
  sex:PropTypes.string.isRequired
}
