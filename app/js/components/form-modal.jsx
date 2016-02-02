'use strict';

import React from 'react';
import Modal from './modal';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment-timezone';
import Select from 'react-select';
import { reduxForm } from 'redux-form';
import { load } from '../actions/form';

const fields = [
  'id',
  'title',
  'email',
  'primaryOfficer',
  'startDate',
  'endDate',
  'committeeName',
  'user.firstName',
  'user.lastName',
  'user.dce',
];

class FormModal extends React.Component {

  constructor() {
    super();

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(load(this.props.officer));
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.show && newProps.show) {
      this.props.dispatch(load(newProps.officer));
    }
  }

  submit(values) {
    console.log("Values", values);
    const officer = Object.assign({}, values);
    officer.primaryOfficer = Boolean(officer.primaryOfficer);

    officer.startDate = moment.tz(officer.startDate, 'America/New_York').utc().toDate();
    if (officer.endDate && officer.endDate.valueOf() !== "") {
      officer.endDate = moment.tz(officer.endDate.valueOf(), 'America/New_York').utc().toDate();
    } else {
      officer.endDate = null;
    }

    this.props.submit(officer)
      .then(() => this.props.close());
  }

  render() {
    const { handleSubmit, fields: {
      title,
      email,
      primaryOfficer,
      startDate,
      endDate,
      user: { firstName, lastName, dce },
      committeeName,
    } } = this.props;
    return (
      <Modal
        show={this.props.show}
        close={this.props.close}
        closeText='Cancel'
        submitText={`${this.props.title} Officer`}
        header={`${this.props.title} Officer`}
        submit={handleSubmit(this.submit)}
      >
        <form className='form-horizontal'>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='title'>Title</label>
            <div className='col-sm-10'>
              <input className='form-control' type='text' id='title' placeholder='Title' {...title} />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='email'>Email</label>
            <div className='col-sm-10'>
              <input className='form-control' type='text' id='email' placeholder='Email' {...email} />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='committee'>Committee</label>
            <div className='col-sm-10'>
              <Select
                name='committee'
                options={this.props.committees.map(committee => {
                  return { value: committee.name, label: committee.name };
                })}
                allowCreate={this.props.title === 'Add'}
                newOptionCreator={value => {
                  return { label: value, value };
                }}
                value={committeeName.value}
                onChange={committeeName.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <div className='checkbox'>
              <div className='col-sm-offset-2 col-sm-10'>
                <label>
                  <input type='checkbox' id='primaryOfficer' checkede={primaryOfficer.value} {...primaryOfficer} />
                  Primary Officer
                </label>
              </div>
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='dce'>DCE</label>
            <div className='col-sm-10'>
              <input disabled={this.props.title === 'Edit'} className='form-control' type='text' id='dce' placeholder='DCE' {...dce} />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='firstName'>First Name</label>
            <div className='col-sm-10'>
              <input disabled={this.props.title === 'Edit'} className='form-control' type='text' id='firstName' placeholder='First Name' {...firstName} />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='lastName'>Last Name</label>
            <div className='col-sm-10'>
              <input disabled={this.props.title === 'Edit'} className='form-control' type='text' id='lastName' placeholder='Last Name' {...lastName} />
            </div>
          </div>
          <div className='form-group'>
            <label className='control-label col-sm-2' htmlFor='startDate'>Start Date</label>
            <div className='col-sm-10'>
              <DateTimeField
                dateTime={startDate.value || new Date()}
                onChange={startDate.onChange}
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
                dateTime={endDate.value || new Date()}
                onChange={endDate.onChange}
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

export default reduxForm({
  form: 'officer',
  fields,
},
state => ({
  initialValues: state.initialFormState.data,
}))(FormModal);
