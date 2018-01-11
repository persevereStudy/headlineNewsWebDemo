import React from 'react';
import { connect } from 'dva';
import ComponentHeader from "../componentsTwo/header";
import ComponentBody from "../componentsTwo/body";
import ComponentFooter from "../componentsTwo/footer";


function IndexPage() {

  var componentHeader = <ComponentHeader/>
  return (

    <div>
      {componentHeader}
      <ComponentBody userid={123456} age = {20} sex={2}/>
      <ComponentFooter/>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
