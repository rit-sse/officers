'use strict';

import React from 'react';
import crypto from 'crypto';

export default class Officer extends React.Component {
  constructor() {
    super();

    this.gravatar = this.gravatar.bind(this);
  }

  gravatar(dce) {
    const hash = crypto.createHash('md5').update(`${dce}@rit.edu`).digest('hex');
    return `https://gravatar.com/avatar/${hash}?d=mm`;
  }

  render() {
    return (
      <div className='col-md-6 extra-padding'>
        <div className='media'>
          <div className='media-left media-middle'>
            <a href=''>
              <img className='media-object' src={this.gravatar(this.props.officer.user.dce)} alt='' />
            </a>
          </div>
          <div className='media-body'>
            <h4 className='media-heading'>{this.props.officer.title}</h4>
            <h5 className='media-heading'>{this.props.officer.user.firstName} {this.props.officer.user.lastName}</h5>
          </div>
        </div>
      </div>
    );
  }
}
