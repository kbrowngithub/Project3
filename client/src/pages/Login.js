import React, { Component } from "react";
import API from "../utils/API";

class Login extends Component {
    state = {
        email: "",
        password: "",
    };

    handleFormSubmit = event => {
        if (!this.state.email) {
            return alert("Please enter your email");
        }
        if (!this.state.password) {
            return alert("Please enter your password")
        }

        if (this.state.email && this.state.password) {
            alert("All correct")
            API.login({
                email: this.state.email,
                password: this.state.password
            }).then(function(data){
                console.log("CLIENT DATA " + data);
                sessionStorage.setItem("Logout", false);
                window.location.href="/profile"
            })
        }
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    
    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"></i>  Login</h1>
                        {/* <% include ./partials/messages %> */}
                        <form action="/login" method="POST">
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label for="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <button onClick={this.handleFormSubmit} type="button" className="btn btn-primary btn-block">Login</button>
                        </form>
                        <p className="lead mt-4">
                            No Account? <a href="/signup">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;