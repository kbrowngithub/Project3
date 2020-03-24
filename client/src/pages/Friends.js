import React, { Component } from 'react';
//allows linking to different routes
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';
import API from "../utils/API";

//class component
export default class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: sessionStorage.getItem("UserEmail"),
            userContacts: JSON.parse(sessionStorage.getItem("UserContacts"))
        }
    }

    componentDidMount() {
        console.log(`componentDidMount: sessionStorage.getItem(\"UserContacts\") = ${sessionStorage.getItem("UserContacts")}`);
        console.log(`componentDidMount: sessionStorage.getItem(\"UserEmail\") = ${sessionStorage.getItem("UserEmail")}`);
        // this.setState(
        //     {
        //         userEmail: JSON.parse(sessionStorage.getItem("UserEmail")),
        //         userContacts: JSON.parse(sessionStorage.getItem("UserContacts")) 
        //     }
        // );
        this.loadContacts();
    }

    loadContacts = () => {
        console.log(`loadContacts: this.state.userEmail = ${this.state.userEmail}`);
        console.log(`loadContacts: this.state.userContacts = ${this.state.userContacts}`);
        // API.getContacts({ email: this.state.userEmail })
        //     .then(res => {
        //         console.log(`contactList = ${JSON.stringify(res.data)}`);
        //         // var index = res.data.map(x => x.userEmail).indexOf(this.state.userEmail);
        //         // var contactList = res.data[index].contacts
        //         var contactList = res.data.contacts

        //         this.setState({ contacts: contactList });
        //     })
        //     .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        event.preventDefault();

        window.location.href = '/invite';
    }

    renderTableData() {
        console.log(`renderTableData: this.state.userContacts = ${this.state.userContacts}`);
        return this.state.userContacts.map((contacts) => {
            const { _id, name, mobile, email } = contacts //destructuring
            return (
                <tr key={_id}>
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