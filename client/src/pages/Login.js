import React, { Component } from "react";
import API from "../utils/API";
import { Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Login extends Component {
    state = {
        email: "",
        password: "",
        loginFlag: 0,
        loggedIn: false
    };
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem("Logout")) === false) {
            this.setState({loggedIn: true});
        }
    }

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
            }).then(function(res){
                let contactArr = ["No contacts"];
                if (res.data.contacts.length > 0) {
                    console.log("maybe");
                    sessionStorage.setItem("UserContacts", JSON.stringify(res.data.contacts));
                } else {
                    console.log("nope");
                    sessionStorage.setItem("UserContacts", JSON.stringify(contactArr));
                 
                }
                sessionStorage.setItem("UserEmail", JSON.stringify(res.data.email))
                sessionStorage.setItem("UserId", JSON.stringify(res.data._id))
                sessionStorage.setItem("UserName", JSON.stringify(res.data.name))
                
                sessionStorage.setItem("Logout", false);
                sessionStorage.setItem("user", currentComponent.state.email);
                currentComponent.props.history.push('/');

            }).catch(function(error){
                if (error) {
                    currentComponent.setState({loginFlag: 3})
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
            <div>
            {this.state.loggedIn === false ? (
                
                    <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3 heading"><i className="fas fa-sign-in-alt"></i>  Login</h1>
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
                                <button onClick={this.handleFormSubmit} type="button" className="standardButton loginButton">Login</button>
                            </form>
                            <p className="lead mt-4">
                                No Account? <Link to="/signup">Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
                
            ) : (
                    <div><Redirect to={'/'}/></div>
            )}
            </div>
        )
        
    }
}

export default Login;