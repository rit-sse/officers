'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment-timezone';
import Select from 'react-select';

export default class FormModal extends React.Component {

  constructor() {
    super();

    this.submit = this.submit.bind(this);
  }

  submit() {
    const officer = ['title', 'email']
      .reduce((prev, key) => {
        prev[key] = this.refs[key].value || null;
        return prev;
      }, {});

    officer.primaryOfficer = this.refs.primaryOfficer.checked;

    officer.user = ['firstName', 'lastName', 'dce']
      .reduce((prev, key) => {
        prev[key] = this.refs[key].value || null;
        return prev;
      }, {});

    officer.committee = {
      name: ReactDOM.findDOMNode(this.refs.committee).querySelector('input[name="committee"]').value || null,
    };

    officer.startDate = moment.tz(this.refs.startDate.getValue(), 'America/New_York').utc().toDate();
    if (!isNaN(this.refs.endDate.getValue().valueOf())) {
      officer.endDate = moment.tz(this.refs.endDate.getValue(), 'America/New_York').utc().toDate();
    }
    this.props.close();
    this.props.submit(officer);
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        close={this.props.close}
        closeText='Cancel'
        submitText={`${this.props.title} Officer`}
        header={`${this.props.title} Officer`}
        submit={this.submit}
      >
        <form className='form-horizontal'>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='title'>Title</label>
            <div className='col-sm-10'>
              <input className='form-control' type='text' id='title' placeholder='Title' defaultValue={this.props.officer.title} ref='title' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='email'>Email</label>
            <div className='col-sm-10'>
              <input className='form-control' type='text' id='email' placeholder='Email' defaultValue={this.props.officer.email} ref='email' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='committee'>Committee</label>
            <div className='col-sm-10'>
              <Select
                name='committee'
                value={this.props.officer.committeeName}
                options={this.props.committees.map(committee => {
                  return { value: committee.name, label: committee.name };
                })}
                ref='committee'
                allowCreate
                newOptionCreator={value => {
                  return { label: value, value };
                }}
              />
            </div>
          </div>
          <div className='form-group'>
            <div className='checkbox'>
              <div className='col-sm-offset-2 col-sm-10'>
                <label>
                  <input type='checkbox' id='primaryOfficer' checked={this.props.officer.primaryOfficer} ref='primaryOfficer' />
                  Primary Officer
                </label>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='dce'>DCE</label>
            <div className='col-sm-10'>
              <input className='form-control' type='text' id='dce' placeholder='DCE' defaultValue={this.props.officer.user.dce} ref='dce' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='firstName'>First Name</label>
            <div className='col-sm-10'>
              <input className='form-control' type='text' id='firstName' placeholder='First Name' defaultValue={this.props.officer.user.firstName} ref='firstName' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='lastName'>Last Name</label>
            <div className='col-sm-10'>
              <input className='form-control' type='text' id='lastName' placeholder='Last Name' defaultValue={this.props.officer.user.lastName} ref='lastName' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='startDate'>Start Date</label>
            <div className='col-sm-10'>
              <DateTimeField
                dateTime={moment().format()}
                format=''
                ref='startDate'
                inputFormat='YYYY-MM-DD'
                mode='date' />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='endDate'>End Date</label>
            <div className='col-sm-10'>
              <DateTimeField
                defaultText={null}
                dateTime={moment().format()}
                format=''
                ref='endDate'
                inputFormat='YYYY-MM-DD'
                mode='date' />
            </div>
          </div>
       </form>
      </Modal>
    );
  }
}
