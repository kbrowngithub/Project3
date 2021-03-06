import React, { Component } from 'react';
import { Col, Row } from "../components/Grid";
import RecipeSearch from "../components/RecipeSearch";
import DrinkSearch from "../components/DrinkSearch";
import RecipeCard from "../components/RecipeCard";
import DrinkCard from "../components/DrinkCard";
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipeData: [],
            drinkData: [],
        }
    }

    componentDidMount() {
        console.log(sessionStorage.getItem("Logout"))
        if (sessionStorage.getItem("Logout") === "true" || sessionStorage.getItem("Logout") === null) {
            this.props.history.push("/login");
        }
    }


    updateRecipes = (array) => {
        this.setState({ recipeData: array });
    }

    updateDrinks = (array) => {
        this.setState({ drinkData: array });
    }

    render() {
        return (
                <div className="row">
                    <DrinkSearch updateDrinksCB={this.updateDrinks}></DrinkSearch>
                    <br></br>
                    <RecipeSearch updateRecipesCB={this.updateRecipes}></RecipeSearch>
                


                <Row>
                    <Col size="md-6">
                        <div class="containerRecipe">
                            <div class="row">
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
                            </div>
                        </div>
                    </Col>


                    <Col size="md-6">
                        <div class="containerDrink">
                            <div class="row">
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
                                        <h3></h3>
                                    )}
                            </div>
                        </div>

                    </Col>

                </Row>
            </div>

        )
    }
}
export default Home;