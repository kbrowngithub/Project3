import React from "react";
import { Link } from 'react-router-dom';

function Nav() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">ReactApp</Link>
        <div className="">
            <ul className="navbar-nav">
            <li className="navbar-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/friends" className="nav-link">Friends</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/recipes" className="nav-link">Recipes</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create User</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/pantry" className="nav-link">Pantry</Link>
                </li>
            </ul>
        </div>
    </nav>
);
}

export default Nav;
