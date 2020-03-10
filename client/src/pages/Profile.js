import React, { Component } from "react";
import API from "../utils/API";

class Profile extends Component {
    handleLogout = event => {
        API.logout().then(
                // console.log("test")
                window.location.replace('/')
        )
    }

    render() {
        return (
            <div>
                <h1 class="mt-4">Dashboard</h1>
                <p class="lead mb-3">Welcome </p>
                {/* <%= user.name %> */}
                <button onClick={this.handleLogout} type="button" className="btn">
                    Logout
                        </button>
                <a href="/" class="btn btn-secondary">Home</a>
            </div>

        )
    }


}

export default Profile;