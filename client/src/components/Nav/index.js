import React from "react";
import { Link } from 'react-router-dom';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';

function Nav() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Chuck Wagon</Link>
            <div className="">
                <ul className="navbar-nav">
                    <AwesomeButton
                        type="secondary"
                        size="small"
                        class="margin"
                    // action={(element, next) => doSomethingThenCall(next)}
                    >Home</AwesomeButton>
                       <AwesomeButtonProgress
                        type="primary"
                        size="small"
                    // action={(element, next) => doSomethingThenCall(next)}
                    >Friends</AwesomeButtonProgress>
                     <AwesomeButtonProgress
                        type="secondary"
                        size="small"
                    // action={(element, next) => doSomethingThenCall(next)}
                    >Recipes</AwesomeButtonProgress>
                      <AwesomeButtonProgress
                        type="primary"
                        size="small"
                    // action={(element, next) => doSomethingThenCall(next)}
                    >NewUser</AwesomeButtonProgress>
                       <AwesomeButtonProgress
                        type="secondary"
                        size="small"
                    // action={(element, next) => doSomethingThenCall(next)}
                    >Pantry</AwesomeButtonProgress>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
