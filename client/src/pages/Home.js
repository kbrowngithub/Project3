import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import RecipeSearch from "../components/RecipeSearch";
import RecipeCard from "../components/RecipeCard";

class Home extends Component {
    constructor(props) {
        super(props) 
        
        this.state = {
            recipeData: []
        }
        this.updateRecipes = this.updateRecipes
        
    }

    updateRecipes = array => {
        this.setState({ recipeData: array });
    }

    render() {
        return (
            <div>
                <h3 className="content-center">Home</h3>
                <div className="row">
                    <Button variant="info" style={{ margin: '10px' }}>Drink Recipes</Button>

                    <RecipeSearch updateRecipesCB={ this.updateRecipes }></RecipeSearch>
                </div>
                <h4>Found Recipes</h4>

                <div className="row">
                    {this.state.recipeData.length ? (
                        this.state.recipeData.map(recipe => (
                            <RecipeCard
                            id={recipe.id}
                            key={recipe.id}
                            image={recipe.image}
                            title={recipe.title}
                            missingIngredients={recipe.missedIngredients}
                            usedIngredients={recipe.usedIngredients}
                            />
                        ))
                        
                    ) : (
                        <h3>Click the Recipe Buttons to Display New Recipes</h3>
                    )}

                </div>
            </div>
        )
    }
}
export default Home;