import React, { Component } from 'react';
//allows linking to different routes
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";

//class component
export default class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: sessionStorage.getItem("UserId"),
            userEmail: sessionStorage.getItem("UserEmail"),
            userContacts: JSON.parse(sessionStorage.getItem("UserContacts"))
        }
    }

    componentDidMount() {
        // console.log(`componentDidMount: sessionStorage.getItem(\"UserContacts\") = ${sessionStorage.getItem("UserContacts")}`);
        // console.log(`componentDidMount: sessionStorage.getItem(\"UserEmail\") = ${sessionStorage.getItem("UserEmail")}`);
        // this.setState(
        //     {
        //         userContacts: JSON.parse(sessionStorage.getItem("UserContacts")) 
        //     }
        // );
        this.loadContacts();
    }

    loadContacts = () => {
        // console.log(`loadContacts: this.state.userId = ${this.state.userId}`);
        // console.log(`loadContacts: this.state.userEmail = ${this.state.userEmail}`);
        // console.log(`loadContacts: this.state.userContacts = ${this.state.userContacts}`);
        API.getContacts({ userId: this.state.userEmail })
            .then(res => {
                console.log(`contactList = ${JSON.stringify(res.data)}`);
                this.setState({ userContacts: res.data });
            })
            .catch(err => console.log(err));
    }

    removeContact = (email, contactData) => {
        console.log(`removeContact: ${JSON.stringify(contactData)}`)
        // API.removeContact({ email:email, contact: contactData })
        API.removeContact({ userEmail: email, name: contactData.name, mobile: contactData.mobile, email: contactData.email })
            .then(res => console.log("Contact Removed"))
            .then(this.loadContacts)
            .catch(err => console.log(err));
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
                <List>
                        <ListItem key={_id} >
                            <Link to={"/invite/" + name + "/" + mobile + "/" + email}>
                                {name}
                            </Link>
                            <DeleteBtn onClick={() => this.removeContact(this.state.userEmail, {id: _id, name:name, mobile:mobile, email:email})} />
                        </ListItem>
                </List>
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
                        {/* <table className="table">
                            <tbody> */}
                                {this.renderTableData()}
                            {/* </tbody>
                        </table> */}
                        <Button className="btn-friend standardButton" variant="light" onClick={this.handleFormSubmit}>New Friend</Button>
                    </div>
                </div>
            </div>
        )
    }
}

