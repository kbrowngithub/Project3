import React, { Component } from 'react';
import "./style.css";
import API from "../../utils/API";
import QuantityBtn from '../QuantityBtn'
import { Button } from 'react-bootstrap';
class Table extends Component {
    constructor (props) {
        super(props) 
        this.state = {
            ingredients: [],
            newIngredient: null,
            newQuantity: null,
            newUnit: null
        }
        this.addIngredient = this.addIngredient.bind(this);
        this.sendIngredient = this.sendIngredient.bind(this);
        this.deleteIngredient = this.deleteIngredient.bind(this);
    }
    componentDidMount() {
        this.loadIngredients();
    }

    updateQuantity = (id, int) => {
        API.updateIngredient({id: id, quantity: int})
            .then(res=> console.log("Quantity Changed"))
            .catch(err=> console.log(err));
        }

    loadIngredients = () => {
        API.getIngredients()
            .then(res=> {
                this.setState({ ingredients: res.data });
            })
            .catch(err => console.log(err));
    }

    addIngredient({ target }) {
        this.setState({
            [target.name]: target.value
        });

    }
    
    deleteIngredient (id) {
        API.deleteIngredient(id)
            .then(res => window.location.reload(false))
            .catch(err => console.log(err));
    }

    sendIngredient() {
        if (this.state.newIngredient && this.state.newQuantity) {
            API.saveIngredient({
                name: this.state.newIngredient,
                quantity: this.state.newQuantity,
                unit: this.state.newUnit
            })
            .then(res => window.location.reload(false))
            .catch(err => console.log(err));
        }
    }

    renderTableData() {
        return this.state.ingredients.map((ingredient, index) => {
          return(
            <tr key={ingredient._id}>
              <td>{ingredient.name}</td>
              <td>
                <QuantityBtn 
                    id={ingredient._id}
                    quantity={ingredient.quantity}
                    updateQuantityCB = { this.updateQuantity }/>
              </td>
              <td>{ingredient.unit}</td>
              <td><Button variant="danger" onClick={() => this.deleteIngredient(ingredient._id)}>X</Button></td>
            </tr>
          )
        });
    }
    renderTableHeader() {
        let header = Object.keys(this.state.ingredients[0])
        return header.map((key, index) => {
            if (index > 0 && index < 4) {
                return <th key={index}>{key.toUpperCase()}</th>
            } else if (index === 4) {
                return <th>DELETE</th>
            }
            
        })
    }
    render() {
        return (
            <div>
                <h1 id='title'>Pantry</h1>
                {this.state.ingredients.length ? (
                <table id='ingredients'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
                ) : (
                    <h3>No ingredients to display, add some below!</h3>
                )}
         
                <input name="newIngredient" type="text" placeholder="Add Ingredient" value={this.state.newIngredient} onChange={this.addIngredient}></input>
                <input name="newQuantity" type="text" placeholder="Add Quantity" value={this.state.newQuantity} onChange={this.addIngredient}></input>
                <input name="newUnit" type="text" placeholder="Add Unit" value={this.state.newUnit} onChange={this.addIngredient}></input>
                <button value="Send" onClick={this.sendIngredient}>Submit Ingredient</button>
             
            </div>
        )
    }
}
export default Table;
