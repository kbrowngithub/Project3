import React, { Component } from 'react';
import "./style.css";
import API from "../../utils/API";

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
    }
    componentDidMount() {
        this.loadIngredients();
    }

    loadIngredients = () => {
        API.getIngredients()
            .then(res=> {
                this.setState({ ingredients: res.data });
                console.log(this.state.ingredients)
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
        .then(res => window.location.reload(false))
        .catch(err => console.log(err));
    }

    renderTableData() {
        return this.state.ingredients.map((ingredient, index) => {
          const { id, name, quantity, unit } = ingredient
          return(
            <tr key={id}>
              <td>{name}</td>
              <td>{quantity}</td>
              <td>{unit}</td>
            </tr>
          )
        });
    }
    renderTableHeader() {
        let header = Object.keys(this.state.ingredients[0])
        return header.map((key, index) => {
            if (key === "name" || key === "quantity" || key === "unit") {
                return <th key={index}>{key.toUpperCase()}</th>
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
