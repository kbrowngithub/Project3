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
        recipes: [],
        title: "",
        image: "",
        idAPI: "",
        ingredients: [],
        instructions: [],
        drinks: []
    }

    componentDidMount() {
        console.log(sessionStorage.getItem("Logout"))
        if (sessionStorage.getItem("Logout") === "true" || sessionStorage.getItem("Logout") === null) {
            window.location.href = "/login"
        } else { 
            this.loadRecipes();
            this.loadDrinks();
        }
    }
    loadDrinks = () => {
        API.loadDrinks()
            .then(res => this.setState({ drinks: res.data }))
            .catch(err => console.log(err));
    }
    loadRecipes = () => {
        API.getRecipes()
            .then(res => this.setState({ recipes: res.data }))
            .catch(err => console.log(err));
    }
    deleteRecipe = id => {
        API.deleteRecipe(id)
            .then(res => this.loadRecipes())
            .catch(err => console.log(err));
    };
    deleteDrink = id => {
        API.deleteDrink(id)
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
            title: data.title,
            image: data.image,
            ingredients: [data.ingredients],
            instructions: [data.instructions]
        })
            .then(res => {
                this.loadRecipes();
                this.state.title = "";
                this.state.image = "";
                this.state.ingredients = [];
                this.state.instructions = []
            })
            .catch(err => console.log(err));

    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <div className="column bordered">
                        
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

                            {this.state.recipes.length ? (
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
                                    <h3>No Results to Display</h3>
                                )}
                        </div>
                        <div className="bordered recipeList column">
                            <h1 className="heading">Saved Drinks</h1>

                            {this.state.drinks.length ? (
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
                                    <h3>No Results to Display</h3>
                                )}
                        </div>
                   
                </Row>
            </Container>
        )
    }

}

export default Recipes;