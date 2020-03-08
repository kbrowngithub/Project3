import React, { Component } from 'react';
import axios from 'axios';

//constructor for user
export default class CreateUser extends Component {
    constructor(props) {
        //all constructors in React needs to start with super(props)
        super(props);
        //binds "this" to each method
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //creates properties. State updates page with new values
        this.state = {
            username: '',
        }
    }

    //sets state after changing/creating user name
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    //when submit button clicked, creates user
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }
        console.log(user);
        //Post request through axios adds exercise to db
        axios.post('http://localhost:3000/users/add/', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }

    //renders Create User form
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type='text'
                            required
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Create User' className='btn btn-primary' />
                    </div>
                </form>
            </div>
        )
    }
};
