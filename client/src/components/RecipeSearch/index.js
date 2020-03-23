import React, { Component } from 'react';
import API from "../../utils/API";
import { Button } from 'react-bootstrap';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';


class RecipeSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: [],
            strQuery: ""
        }
        this.searchRecipes = this.searchRecipes.bind(this);
    }
    componentDidMount() {
        this.loadIngredients();
    }

    loadIngredients = () => {
        API.getIngredients()
            .then(res => {
                this.jsonConverter(res.data);
            })
            .catch(err => console.log(err));
    }
    searchRecipes = () => {
        API.searchRecipes({
            query: this.state.strQuery
        })
            .then(res => {
                this.props.updateRecipesCB(res.data);
            })
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
        let pantryQuery = "";
        array.map(ingredient => {
            if (ingredient === finalEl) {
                return pantryQuery += ingredient;
            } else {
                return pantryQuery += ingredient + ",+";
            }
        });
        this.setState({ strQuery: pantryQuery });
    }
    render() {
        return (
            <Button
                onClick={this.searchRecipes}
                className='foodButton'
            >
                Food Recipes
            </Button>
            // <Button variant="info" onClick={this.searchRecipes} style={{ margin: '10px' }}>Food Recipes</Button>
        )
    }
}

export default RecipeSearch;