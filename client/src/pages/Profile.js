import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";

class Profile extends Component {
    componentDidMount() {
        console.log(sessionStorage.getItem("Logout"))
        if (sessionStorage.getItem("Logout") === "true" || sessionStorage.getItem("Logout") === null) {
            window.location.href = "/login"
        }
    }
    
    handleLogout = event => {
        API.logout().then(function(response){
            console.log("Data: ", response) 
            if (response.data === "Logout!") {
                sessionStorage.setItem("Logout", true);
                window.location.href = "/"
                console.log("User has been logged out client")
            }
        })
    }


    render() {
        return (
            <div>
                <h1 class="mt-4">Dashboard</h1>
                <p class="lead mb-3">Welcome </p>
                {/* <%= user.name %> */}
                <button onClick={this.handleLogout} type="button" className="btn">Logout</button>
                <a href="/" class="btn btn-secondary">Home</a>
            </div>

        )
    }
}

export default Profile;