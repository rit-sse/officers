'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class PaginationButton extends React.Component {
  constructor(path) {
    super();
    this.state = { path };
  }

  render() {
    return (
      <Link to={{ pathname: '/officers/edit', page: this.props.eventKey }}>
        {this.props.children}
      </Link>
    );
  }
}
