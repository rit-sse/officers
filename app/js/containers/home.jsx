'use strict';

import React from 'react';
import { connect } from 'react-redux';


function mapStateToProps(state) {
  return {
    officers: state.officers,
  };
}


class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='container'>
        <h1>Home</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
