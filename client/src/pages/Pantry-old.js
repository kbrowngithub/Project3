import React, { Component } from 'react';
import API from "../utils/API";



//class component
export default class IngredientList extends Component {
    constructor() {
        super();
        this.state = {
            userIngredients: [],
            newIngredient: null,
            newQuantity: null,
            newUnit: null
        };
        this.addIngredient = this.addIngredient.bind(this);
        this.sendIngredient = this.sendIngredient.bind(this);
        
    }

    componentDidMount() {
        this.loadIngredients();

    }
    loadIngredients = () => {
        API.getIngredients()
            .then(res=> {
                this.setState({ userIngredients: res.data });
                console.log(this.state.userIngredients)
            })
            .catch(err => console.log(err));
    }

    addIngredient({ target }) {
        this.setState({
            [target.name]: target.value
        });

    }
    sendIngredient() {
        API.saveIngredient({
            name: this.state.newIngredient,
            quantity: this.state.newQuantity,
            unit: this.state.newUnit
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
            <h3>Pantry</h3>
          </div>
            // <div>
            //     
            //     <table className="table">
            //         <thead className="thead-light">
            //             <tr>
            //                 <th>Ingredient</th>
            //                 <th>Amount</th>
            //             </tr>
            //         </thead>
            //         {/* returns rows of table */}
            //         {this.state.userIngredients.length ? (
            //             <List>
            //                 {this.state.userIngredients.map(ingredient => (
            //                     <ListItem key={ingredient._id}>
            //                         <Link to={"/pantry/" + ingredient._id}>
            //                             <strong>
            //                                 {ingredient.name}
            //                             </strong>
            //                         </Link>
            //                     </ListItem>
            //                 ))}
            //             </List>
            //             ) : (
            //                 <h3>No ingredients to display, add some below!</h3>
            //             )}
            //         {/* <tbody>
            //             <td>Roast Beast</td>
            //             <td>23 lbs</td>
            //         </tbody>
            //         <tbody>
            //             <td>Liberty Cap Mushrooms</td>
            //             <td>3 amazing highs</td>
            //         </tbody>
            //         <tbody>
            //             <td>Anchovies</td>
            //             <td>3 pallets</td>
            //         </tbody> */}
            //         <tbody>
            //             <td>
            //                 <input name="newIngredient" type="text" placeholder="Add Ingredient" value={this.state.newIngredient} onChange={this.addIngredient}></input>
            //             </td>
            //             <td>
            //                 <input name="newQuantity" type="text" placeholder="Add Quantity" value={this.state.newQuantity} onChange={this.addIngredient}></input>
            //                 <button value="Send" onClick={this.sendIngredient}>Submit Ingredient</button>
            //             </td>
            //         </tbody>
            //     </table>
            // </div>
        // )
        )}
}