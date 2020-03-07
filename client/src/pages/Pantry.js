import React, { Component } from 'react';
import API from "../utils/API";
//allows linking to different routes
import { Link } from 'react-router-dom';

//class component
export default class IngredientList extends Component {
    constructor() {
        super();
        this.state = {
            userIngredients: [],
            newIngredient: null,
            newQuantity: null
        };
        this.addIngredient = this.addIngredient.bind(this);
        this.sendIngredient = this.sendIngredient.bind(this);
    }
    addIngredient({ target }) {
        this.setState({
            [target.name]: target.value
        });

    }
    sendIngredient() {
        API.saveIngredient({
            newItem: this.state.newIngredient,
            newQuantity: this.state.newQuantity
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render() {
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
                    <tbody>
                        <td>
                            <input name="newIngredient" type="text" placeholder="Add Ingredient" value={this.state.newIngredient} onChange={this.addIngredient}></input>
                        </td>
                        <td>
                            <input name="newQuantity" type="text" placeholder="Add Quantity" value={this.state.newQuantity} onChange={this.addIngredient}></input>
                            <button value="Send" onClick={this.sendIngredient}>Submit Ingredient</button>
                        </td>
                    </tbody>
                </table>
            </div>
        )
    }
}