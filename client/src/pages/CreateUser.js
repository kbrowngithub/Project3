import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
    //class component
export default class CreateUser extends Component {

    //renders Create User form
    render() {
        return (
            <div>
                <h3>Sign up</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type='text'
                            required
                            className='form-control'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" 
                        required
                        className="form-control"
                            name="email" />
                    </div>
                    <div className='form-group'>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control"
                                name="password" />
                        </div>
                        <input type='submit' value='Create User' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        )
    }
};