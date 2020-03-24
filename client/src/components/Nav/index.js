import React from "react";
import { Link } from 'react-router-dom';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-red.css';
import './styles.css';

function Nav() {

    return (
      
        <nav className="image-blurred-edge navbar navbar-expand-lg navbar-dark">

            <Link to="/" className="navbar-brand">Woking Title</Link>
            <div className="">
                <ul className="navbar-nav naving">
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        element="Link"
                        className='button'
                    ><Link className ="btnFontClr" to="/">Home</Link>
                   </AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        element="Link"
                        className='button'
                    ><Link className ="btnFontClr" to="/friends">Friends</Link></AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        element="Link"
                        className='button'
                    ><Link className ="btnFontClr" to="/recipes">Recipes</Link></AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        element="Link"
                        className='button'
                    ><Link className ="btnFontClr" to="/signup">New User</Link></AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        element="Link"
                        className='button'
                    ><Link className ="btnFontClr" to="/pantry">Pantry</Link></AwesomeButton>
                    <AwesomeButton
                        type="secondary"
                        size="medium"
                        ripple
                        element="Link"
                        className='button'
                    ><Link className ="btnFontClr" to="/login">Log In</Link></AwesomeButton>
                </ul>

            </div>



        </nav>
    
            );
}

export default Nav;