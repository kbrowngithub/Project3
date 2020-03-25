import React, { Component } from "react"
import { AwesomeButton } from 'react-awesome-button';
import { Link } from "react-router-dom";

class LogBtn extends Component {6

    render() {
        if (JSON.parse(sessionStorage.getItem("Logout")) === false) {
            return (
                <div>
                </div>
            )
        } else {
            return (
                <AwesomeButton
                type="secondary"
                size="medium"
                ripple
                className='button'
            ><Link className="btnFontClr" to="/signup">New User</Link></AwesomeButton>
            )
        }

    }
}
export default LogBtn;