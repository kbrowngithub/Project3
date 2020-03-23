import React, { Component } from 'react';
import API from "../../utils/API";
import { Button } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';

class DrinkSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            strQuery: ""
        }
        this.searchDrinks = this.searchDrinks.bind(this);
    }
    componentDidMount() {
        this.loadLiquors();
    }
    loadLiquors = () => {
        API.getLiquors()
            .then(res => this.jsonConverter(res.data))
            .catch(err => console.log(err));
    }
    
    jsonConverter = json => {
        var array = [];
        if (json.length > 0) {
            json.map(ingredient => {
                return array.push(ingredient.name);
            });
            this.pantryConcatenator(array);
        } else {
            console.log("No data to map");
        }
    }
    pantryConcatenator = array => {
        let finalEl = array[array.length - 1];
        let liquorQuery = "";
        array.map(ingredient => {
            if (ingredient === finalEl) {
                return liquorQuery += ingredient;
            } else {
                return liquorQuery += ingredient + ",";
            }
        });
        this.setState({ strQuery: liquorQuery });
    }
    searchDrinks() {
        console.log(this.state.strQuery);
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

            <Button
            onClick={this.searchDrinks}
            className='drinkButton standardButton'
          >
            Drink Recipes
          </Button>
        )
    }
}
export default DrinkSearch;