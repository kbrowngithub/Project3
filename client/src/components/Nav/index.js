import React from "react";
import { Link } from 'react-router-dom';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';
import './styles.css';

function Nav() {

    return (
      
        <nav className="navbar navbar-expand-lg navbar-dark">

            <Link to="/" className="navbar-brand">Chuck Wagon</Link>
            <div className="">
                <ul className="navbar-nav naving">
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        href="/"
                        className='button'
                    >Home
                   </AwesomeButton>
                    <AwesomeButton
                        type="primary"
                        size="medium"
                        ripple
                        href="/friends"
                        className='button'
                    >Friends</AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        href="/recipes"
                        className='button'
                    >Recipes</AwesomeButton>
                    <AwesomeButton
                        type="primary"
                        size="medium"
                        ripple
                        href="/create"
                        className='button'
                    >NewUser</AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        href="/pantry"
                        className='button'
                    >Pantry</AwesomeButton>
                </ul>

            </div>

            <div className="md-form my-0">
                <input className="form-control mr-sm-2 searchBar" type="text" placeholder="Search Favorite Recipes" aria-label="Search" />
            </div>
            <div>
        
</div>

        </nav>
    
            );
}

export default Nav;