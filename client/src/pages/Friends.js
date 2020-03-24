import React, { Component } from 'react';
//allows linking to different routes
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';

//class component
export default class Friends extends Component {
    
    handleFormSubmit = event => {
        event.preventDefault();
    
        window.location.href = '/invite';
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