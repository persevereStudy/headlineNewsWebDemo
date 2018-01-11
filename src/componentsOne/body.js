import React from 'react';


export default class Body extends React.Component{
  render(){
    var userName = 'JunKing';
    var boolCanInput = false ;
    var html = "IMOOC\u0020LESSON";
    return(
      <header>
        <h1>这里是主体</h1>
        <p>{userName == ''?'用户还没有登录':'用户名:'+userName}</p>
        <p><input type="button" value={userName} disabled={boolCanInput}/></p>
        <p>{html}</p>
      </header>
    )
  }
}
