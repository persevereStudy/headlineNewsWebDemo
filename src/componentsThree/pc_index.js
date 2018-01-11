'use strict'
import React from 'react';
import PCHeader from './pc_header';
import PcFooter from './pc_footer';
import PCNewsContainer from './pc_newcontainer';

export default class PcIndex extends React.Component {

  render() {
    return (
      <div>
        <PCHeader></PCHeader>
        <PCNewsContainer></PCNewsContainer>
        <PcFooter></PcFooter>
      </div>
    )
  }
}



