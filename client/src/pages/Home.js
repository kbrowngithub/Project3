import React, { Component } from 'react';
import Grid, { Col } from "../components/Grid"
import { Button, Card } from 'react-bootstrap';
import RecipeSearch from "../components/RecipeSearch";
import DrinkSearch from "../components/DrinkSearch";
import RecipeCard from "../components/RecipeCard";
import DrinkCard from "../components/DrinkCard";
import './assets/css/styles.css';

class Home extends Component {
    constructor(props) {
        super(props) 
        
        this.state = {
            recipeData: [],
            drinkData: []
        }
        this.updateRecipes = this.updateRecipes
        this.updateDrinks = this.updateDrinks
        
    }

    updateRecipes = (array) => {
        this.setState({ recipeData: array });
    }

    updateDrinks = (array) => {
        this.setState({ drinkData: array });
    }

    render() {
        return (
            <div 
            // className="background"
            >
                 
               
                <div className="row">
                    <DrinkSearch updateDrinksCB={ this.updateDrinks }></DrinkSearch>

                    <RecipeSearch updateRecipesCB={ this.updateRecipes }></RecipeSearch>
                </div>
                

                <div className="row">
                    <Col size="md-6">
                        {this.state.recipeData.length ? (
                            this.state.recipeData.map(recipe => (
                                <RecipeCard
                                id={recipe.id}
                                key={recipe.id}
                                image={recipe.image}
                                summary={recipe.summary}
                                title={recipe.title}
                                missingIngredients={recipe.missedIngredients}
                                usedIngredients={recipe.usedIngredients}
                                />
                            ))
                            
                        ) : (
                            <h3></h3>
                        )}
                    </Col>
                

                    <Col size="md-6">
                        {this.state.drinkData.length ? (
                            this.state.drinkData.map(drink => (
                                <DrinkCard
                                id={drink.idDrink}
                                key={drink.idDrink}
                                title={drink.strDrink}
                                image={drink.strDrinkThumb}
                                />
                            ))
                            
                        ) : 
                        (
                            <h3></h3>
                        )
                        }
                    </Col>
                </div>
            </div>
        )
    }
}
export default Home;