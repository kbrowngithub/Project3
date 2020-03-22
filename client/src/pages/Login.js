import React, { Component } from "react";
import API from "../utils/API";

class Login extends Component {
    state = {
        email: "",
        password: "",
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { history } = this.props;

        if (!this.state.email) {
            // return alert("Please enter your email");
            return this.setState({loginFlag: 1});
        }
        if (!this.state.password) {
            // return alert("Please enter your password")
            return this.setState({loginFlag: 2});
        }

        if (this.state.email && this.state.password) {
            let currentComponent = this;
            
            API.login({
                email: this.state.email,
                password: this.state.password
            }).then(function(data){
                console.log("CLIENT DATA ",data);
                sessionStorage.setItem("Logout", false);
                // window.location.href="/profile"
                history.push('/');
            }).catch(function(error){
                if (error) {
                    return currentComponent.setState({loginFlag: 3})
                }
            });
            
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
                        { this.state.loginFlag === 1 && <p>Please enter your email</p>}
                        { this.state.loginFlag === 2 && <p>Please enter your password</p>}
                        { this.state.loginFlag === 3 && <p>Email or password is incorrect</p>}
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
                            <button onClick={this.handleFormSubmit} type="button" className="btn btn-primary btn-block btn-login">Login</button>
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