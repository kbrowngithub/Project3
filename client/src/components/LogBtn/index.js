import React, { Component } from "react"
import { AwesomeButton } from 'react-awesome-button';
import { Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import API from "../../utils/API";
class LogBtn extends Component {6

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    handleLogout = (event) => {
        let currentComponent = this;
        API.logout()
            .then(function (response) {
                sessionStorage.setItem("Logout", true);
                sessionStorage.setItem("UserEmail", null);
                sessionStorage.setItem("UserId", null);
                sessionStorage.setItem("UserName", null);
                currentComponent.props.history.push('/');
            })
        return <Redirect to="/" push={true} />
    }
    render() {
        if (JSON.parse(sessionStorage.getItem("Logout")) !== false) {
            return (
                <div>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        className='button'
                    >
                        <Link className="btnFontClr" to="/login">Log In</Link>
                    </AwesomeButton>
                </div>
            )
        } else {
            return (
                <div>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        className='button'
                        onPress={() => this.handleLogout(this)}
                    >
                        <span className="btnFontClr">Log Out</span>
                    </AwesomeButton>
                </div>
            )
        }

    }
}
export default withRouter(LogBtn);