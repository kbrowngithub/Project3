import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import RecipeForm from "../components/RecipeForm"
class Recipes extends Component {
    state = {
        userEmail: "",
        recipes: [],
        title: "",
        image: "",
        idAPI: "",
        ingredients: [],
        instructions: [],
        drinks: []
    }

    componentDidMount() {
        this.setState({ userEmail: JSON.parse(sessionStorage.getItem("UserEmail")) })
        this.loadRecipes();
        this.loadDrinks();
    }
    loadDrinks = () => {
        API.loadDrinks()
            .then(res => {
                var index = res.data.map(x => x.userEmail).indexOf(this.state.userEmail);
                var drinkList = res.data[index].drinks
                this.setState({ drinks: drinkList }, () => console.log(this.state.drinks))
            })
            .catch(err => console.log(err));
    }
    loadRecipes = () => {
        API.getRecipes()
            .then(res => {
                var index = res.data.map(x => x.userEmail).indexOf(this.state.userEmail);
                var recipeList = res.data[index].recipes;

                this.setState({ recipes: recipeList })
            })
            .catch(err => console.log(err));
    }
    deleteRecipe = id => {
        API.deleteRecipe({ id: id, email: this.state.userEmail })
            .then(res => this.loadRecipes())
            .catch(err => console.log(err));
    };
    deleteDrink = id => {
        API.deleteDrink({ id: id, email: this.state.userEmail })
            .then(res => this.loadDrinks())
            .catch(err => console.log(err))
    }


    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleFormSubmit = data => {
        console.log(data);
        API.saveRecipe({
            userEmail: this.state.userEmail,
            recipe: {
                title: data.title,
                image: data.image,
                ingredients: [data.ingredients],
                instructions: [data.instructions]
            }
        })
            .then(res => {
                this.loadRecipes();
                this.setState({
                    title: "",
                    image: "",
                    ingredients: [],
                    instructions: []
                })
            })
            .catch(err => console.log(err));

    }

    render() {
        return (
            <Container fluid>
                <div className="create-recipe-smallest">
                    <Row>
                        <div className="column bordered recipeBlock">
                            <h1 className="heading createRecipe">Create Recipe</h1>
                            <RecipeForm
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                                title={this.state.title}
                                image={this.state.image}
                                ingredients={this.state.ingredients}
                                instructions={this.state.instructions}
                            />

                        </div>

                        <div className="bordered recipeList column">
                            <h1 className="heading">Saved Recipes</h1>

                            {this.state.recipes.length > 0 ? (
                                <List>
                                    {this.state.recipes.map(recipe => (
                                        <ListItem key={recipe._id}>
                                            <Link to={"/recipes/" + recipe._id}>
                                                <strong className="savedItems">
                                                    {recipe.title}
                                                </strong>
                                            </Link>
                                            <DeleteBtn onClick={() => this.deleteRecipe(recipe._id)} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                    <h3 className="fontStyled">No Results to Display</h3>
                                )}
                        </div>
                        <div className="bordered recipeList column">
                            <h1 className="heading">Saved Drinks</h1>

                            {this.state.drinks.length > 0 ? (
                                <List>
                                    {this.state.drinks.map(drink => (
                                        <ListItem key={drink._id}>
                                            <Link to={"/drinks/" + drink._id}>
                                                <strong className="savedItems">
                                                    {drink.title}
                                                </strong>
                                            </Link>
                                            <DeleteBtn onClick={() => this.deleteDrink(drink._id)} />
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                    <h3 className="fontStyled">No Results to Display</h3>
                                )}
                        </div>

                    </Row>
                </div>
            </Container>
        )
    }

}

export default Recipes;