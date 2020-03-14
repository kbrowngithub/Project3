import React, { Component } from 'react';
import API from "../../utils/API";
import { Button } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';

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
            <AwesomeButton
            variant="info"
            onPress={this.searchDrinks}
            type="secondary"
            size="large"
            ripple
            className='button'
          >
            Drink Recipes
          </AwesomeButton>
        )
    }
}
export default DrinkSearch;