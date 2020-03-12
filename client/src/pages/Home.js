import React, { Component } from 'react';
import Grid, { Col } from "../components/Grid"
import { Button, Card } from 'react-bootstrap';
import RecipeSearch from "../components/RecipeSearch";
import DrinkSearch from "../components/DrinkSearch";
import RecipeCard from "../components/RecipeCard";
import DrinkCard from "../components/DrinkCard";

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
        console.log(this.state.drinkData)
    }

    render() {
        return (
            <div>
                <h3 className="content-center">Home</h3>
                <div className="row">
                    <DrinkSearch updateDrinksCB={ this.updateDrinks }></DrinkSearch>

                    <RecipeSearch updateRecipesCB={ this.updateRecipes }></RecipeSearch>
                </div>
                <h4>Found Recipes</h4>

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
                            <h3>Click the Recipe Buttons to Display New Recipes</h3>
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
                            
                        ) : (
                            <h3>Click the Drink Buttons to Display New Drinks</h3>
                        )}
                    </Col>
                </div>
            </div>
        )
    }
}
export default Home;