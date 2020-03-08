import React from "react";

function Profile() {
    return (
        <div>
            <h1 class="mt-4">Dashboard</h1>
            <p class="lead mb-3">Welcome </p>
            {/* <%= user.name %> */}
            <a href="/logout" class="btn btn-secondary">Logout</a>
            <a href="/" class="btn btn-secondary">Home</a>
        </div>
    )
}

export default Profile;