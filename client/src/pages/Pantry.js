import React, { Component } from 'react';
//allows linking to different routes
import { Link } from 'react-router-dom';

//class component
export default class IngredientList extends Component {

    render(){
        return (
            <div>
               <h3>Pantry</h3>
               <table className="table">
                   <thead className="thead-light">
                       <tr>
                           <th>Ingredient</th>
                           <th>Amount</th>
                       </tr>
                   </thead>
                    {/* returns rows of table */}
                   <tbody>
                       <td>Roast Beast</td>
                       <td>23 lbs</td>
                   </tbody>
                   <tbody>
                       <td>Liberty Cap Mushrooms</td>
                       <td>3 amazing highs</td>
                   </tbody>
                   <tbody>
                       <td>Anchovies</td>
                       <td>3 pallets</td>
                   </tbody>
               </table>
            </div>
        )
    }
}