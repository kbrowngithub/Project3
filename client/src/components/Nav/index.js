import React from "react";
import { Link } from 'react-router-dom';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-red.css';
import './styles.css';
import API from "../../utils/API";

function handleLogout(event) {
    API.logout().then(function(response){
        console.log("Data: ", response) 
        sessionStorage.setItem("Logout", true);
        sessionStorage.setItem("UserEmail", null);
        sessionStorage.setItem("UserId", null);
        sessionStorage.setItem("UserName", null);
        window.location.href = "/"
        console.log("User has been logged out client")
    })
}



export default function Nav() {
    let userEmail = JSON.parse(sessionStorage.getItem("UserEmail"));
    return (

        <nav className="image-blurred-edge navbar navbar-expand-lg navbar-dark">

            <Link to="/" className="navbar-brand">Woking Title</Link>
            <div className="">
                <ul className="navbar-nav naving">
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        className='button'
                    ><Link className="btnFontClr" to="/">Home</Link>
                    </AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        className='button'
                    ><Link className="btnFontClr" to="/friends">Friends</Link></AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        className='button'
                    ><Link className="btnFontClr" to="/recipes">Recipes</Link></AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        className='button'
                    ><Link className="btnFontClr" to="/signup">New User</Link></AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        className='button'
                    ><Link className="btnFontClr" to="/pantry">Pantry</Link></AwesomeButton>
                 {!userEmail ? (
                        <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        className='button'
                    >
                        <Link className="btnFontClr" to="/login">Log In</Link>
                        </AwesomeButton>
                    ) : (
                        <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        className='button'
                        onPress={handleLogout}
                    >
                        <span className="btnFontClr">Log Out</span>
                        </AwesomeButton>
                        )} 
                   
                </ul>

            </div>



        </nav>

    );
}

