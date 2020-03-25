import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-red.css';
import './styles.css';
import LogBtn from "../LogBtn"
import SignBtn from "../SignBtn"

export default function Nav() {
    return (

        <nav className="image-blurred-edge navbar navbar-expand-lg navbar-dark dropdown">
            <Link to="/" className="navbar-brand">Woking Title<span className="spanned"> ▼ </span></Link>

            <ul className="navbar-nav naving dropdown-content">
                <div class="row">
                    <div className="blocking col-sm">
                        <AwesomeButton
                            type="secondary"
                            size="medium"
                            ripple
                            className="button"
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
                    </div>
                </div>
                <div class="row">
                    <div className="blocking col-sm">
                        <SignBtn></SignBtn>
                        <AwesomeButton
                            type="secondary"
                            size="medium"
                            ripple
                            className='button'
                        ><Link className="btnFontClr" to="/pantry">Pantry</Link></AwesomeButton>
                        <LogBtn></LogBtn>
                    </div>
                </div>
            </ul>
        </nav>
    );
}

