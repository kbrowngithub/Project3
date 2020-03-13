import React, { Component } from 'react';
import API from "../../utils/API";
import { Button } from 'react-bootstrap';

class DrinkSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drinkBase: null,
            strQuery: "vodka"
        }
        this.searchDrinks = this.searchDrinks.bind(this);
    }
    searchDrinks() {
        API.searchDrinks({
            query: this.state.strQuery
        })
        .then(res => {
            this.props.updateDrinksCB(res.data.drinks);
        })
        .catch(err => console.log(err));
    }
    render() {
        return (
            <Button variant="info" onClick={this.searchDrinks} style={{ margin: '10px' }}>Drink Recipes</Button>
        )
    }
}
export default DrinkSearch;