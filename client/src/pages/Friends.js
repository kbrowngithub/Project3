import React, { Component } from 'react';
//allows linking to different routes
import { Button } from 'react-bootstrap';
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import { Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//class component
class Friends extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    state = {
        userId: sessionStorage.getItem("UserId"),
        userEmail: sessionStorage.getItem("UserEmail"),
        userContacts: JSON.parse(sessionStorage.getItem("UserContacts"))
    }

    componentDidMount() {
        this.loadContacts();
        if (sessionStorage.getItem("Logout") === "true" || sessionStorage.getItem("Logout") === null) {
            this.props.history.push("/login");
        }
    }

    

    loadContacts = () => {
        API.getContacts({ userId: this.state.userEmail })
            .then(res => {
                this.setState({ userContacts: res.data });
            })
            .catch(err => console.log(err));
    }

    removeContact = (email, contactData) => {
        API.removeContact({ userEmail: email, name: contactData.name, mobile: contactData.mobile, email: contactData.email })
            .then(res => console.log("Contact Removed"))
            .then(this.loadContacts)
            .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.props.history.push('/invite');
    }

    renderTableData() {
        if (JSON.parse(sessionStorage.getItem("Logout")) === false) {
            return this.state.userContacts.map((contacts) => {
                const { _id, name, mobile, email } = contacts //destructuring
                return (
                    <List>
                        <ListItem key={_id} >
                            <Link to={"/invite/" + name + "/" + mobile + "/" + email}>
                                {name}
                            </Link>
                            <DeleteBtn onClick={() => this.removeContact(this.state.userEmail, { id: _id, name: name, mobile: mobile, email: email })} />
                        </ListItem>
                    </List>
                )
            })
        } else {
            alert("Please log in to use this page");
            return <Redirect to={"/login"}></Redirect>
        }
    }

    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="bordered card card-body">
                        <h1 className="text-center mb-3 heading">
                            <i className="fas fa-user-plus"></i> Friends
                        </h1>
                        {this.renderTableData()}
                        <Button className="btn-friend standardButton" variant="light" onClick={this.handleFormSubmit}>New Friend</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Friends);
