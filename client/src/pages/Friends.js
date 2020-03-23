import React, { Component } from 'react';
//allows linking to different routes
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';

//class component
export default class Friends extends Component {
    state = {
        contacts: [
           { id: 1, name: 'Wasif', mobile: 2123456789, email: 'wasif@email.com' },
           { id: 2, name: 'Ali', mobile: 1923567890, email: 'ali@email.com' },
           { id: 3, name: 'Saad', mobile: 1612233445, email: 'saad@email.com' },
           { id: 4, name: 'Asad', mobile: 2598765432, email: 'asad@email.com' }
        ]
     }

    componentDidMount() {
        console.log(sessionStorage.getItem("Logout"))
        if (sessionStorage.getItem("Logout") === "true" || sessionStorage.getItem("Logout") === null) {
            window.location.href = "/login"
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();

        window.location.href = '/invite';
    }

    renderTableData() {
        return this.state.contacts.map((contact, index) => {
           const { id, name, mobile, email } = contact //destructuring
           return (
              <tr key={id}>
                 <td>{name}</td>
                 <td>{mobile}</td>
                 <td>{email}</td>
              </tr>
           )
        })
     }

    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="bordered card card-body">
                        <h1 className="text-center mb-3 heading">
                            <i className="fas fa-user-plus"></i> Friends
                        </h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Mobile#</th>
                                    <th>Email</th>
                                </tr>

                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                        <Button className="btn-friend standardButton" variant="light" onClick={this.handleFormSubmit}>New Friend</Button>
                    </div>
                </div>
            </div>
        )
    }
}