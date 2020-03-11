import React, { Component } from 'react';
//allows linking to different routes
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';

//class component
export default class Friends extends Component {

    render(){
        return (
            <div>
               <h3>Friends</h3>
               <table className="table">
                   <thead className="thead-light">
                       <tr>
                           <th>Username</th>
                           <th>Mobile#</th>
                           <th>Email</th>
                       </tr>
                   </thead>
                   <tbody>
                       {/* returns rows of table */}
                       {/* friends go here */}
                   </tbody>
               </table>
               {/* <input type='button' value='Invite Friend' href="invite" className='btn btn-info' /> */}
               <AwesomeButton
                    type="primary"
                    size="medium"
                    ripple
                    href="/invite"
                    className='button'
                >NewFriend</AwesomeButton>
            </div>
        )
    }
}