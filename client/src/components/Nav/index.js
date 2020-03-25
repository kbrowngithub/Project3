import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-red.css';
import './styles.css';
import API from "../../utils/API";
import LogBtn from "../LogBtn"
import PropTypes from "prop-types";

export default function Nav() {
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
                    <LogBtn></LogBtn>

                </ul>

            </div>



        </nav>

    );
}

