import React, { Component } from 'react';
//allows linking to different routes
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';

//class component
export default class Friends extends Component {

    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-10 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3">
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
                        {/* <input type='button' value='Invite Friend' href="invite" className='btn btn-info' /> */}
                        {/* <AwesomeButton
                    type="primary"
                    size="medium"
                    ripple
                    element="Link"
                    className='button'
                ><Link to="/invite">NewFriend</Link>
                </AwesomeButton> */}
                        <button onClick={this.handleFormSubmit} type="button" className="btn-block btn-friend">
                            <Link to="/invite">NewFriend</Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}