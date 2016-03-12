import React from 'react';
import moment from 'moment';

export default class OfficerTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Email</th>
            <th>Primary</th>
            <th>Committee</th>
            <th>DCE</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.officers.list.map( (officer, i) => {
            return (
              <tr key={officer.id}>
                <td>{officer.title}</td>
                <td>{officer.email}</td>
                <td>{officer.primaryOfficer ? 'Yes' : 'No'}</td>
                <td>{officer.committeeName || 'N/A'}</td>
                <td>{officer.userDce}</td>
                <td>{officer.user.firstName}</td>
                <td>{officer.user.lastName}</td>
                <td>{moment(officer.startDate).format('MM/DD/YYYY')}</td>
                <td>{officer.endDate ? moment(officer.endDate).format('MM/DD/YYYY') : ''}</td>
                <td className='text-center'>
                  <a onClick={() => this.props.showEdit(officer, i)}>
                    <i className='fa fa-pencil' />
                  </a>
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
    );
  }
}
