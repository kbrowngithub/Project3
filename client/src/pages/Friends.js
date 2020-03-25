import React, { Component } from 'react';
//allows linking to different routes
import { Button } from 'react-bootstrap';
import { Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
//class component
class Friends extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    handleFormSubmit = event => {
        event.preventDefault();
        this.props.history.push('/invite');
    }

    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-8 m-auto">
                    <div className="bordered card card-body">
                        <h1 className="text-center mb-3 heading">
                            <i className="fas fa-user-plus"></i> Friends
                        </h1>
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>Username</th>
                                    <th>Mobile#</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* returns rows of table */}
                                {/* friends go here */}
                            </tbody>
                        </table>
                        <Button className="btn-friend standardButton" variant="light" onClick={this.handleFormSubmit}>New Friend</Button>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Friends);