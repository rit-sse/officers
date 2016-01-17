'use strict';

import React from 'react';
import { connect } from 'react-redux';


function mapStateToProps(state) {
  return {
    officers: state.officers,
  };
}


class Edit extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='container'>
        <h1>Edit</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Edit);
