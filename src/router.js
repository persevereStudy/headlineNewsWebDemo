import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Root from './routes/Root'
import PCNewsDetails from './routes/PCNewDetails'
import UserCenter from './routes/UserCenter';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Root} />
        <Route path="/details/:uniquekey" exact component={PCNewsDetails} />
        <Route path="/usercenter" exact component={UserCenter} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
