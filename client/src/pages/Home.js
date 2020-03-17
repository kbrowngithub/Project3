import React, { Component, useState } from 'react';
import Grid, { Col, Row } from "../components/Grid"
import { Button, Card } from 'react-bootstrap';
import API from "../utils/API";
import RecipeSearch from "../components/RecipeSearch";
import DrinkSearch from "../components/DrinkSearch";
import CardDealer from "../components/CardDealer";
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
    }

    updateRecipes = (array) => {
        console.log(array);
       
        this.setState({ recipeData: array }, () => {
            //console.log(this.state.recipeData)
        });
    }

    updateDrinks = (array) => {
        this.setState({ drinkData: array });
    }

    render() {
        return (
            
            <div>

                <h3 className="content-center">Home</h3>
                <div className="row">
                    <DrinkSearch updateDrinksCB={this.updateDrinks}></DrinkSearch>

                    <RecipeSearch updateRecipesCB={this.updateRecipes}></RecipeSearch>
                </div>

                <Row>
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
                        )}
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Home;