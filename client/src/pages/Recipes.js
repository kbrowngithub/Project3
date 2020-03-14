import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import RecipeForm from "../components/RecipeForm"
import RecipeSlide from "../components/RecipeSlide"
class Recipes extends Component {
    state= {
        recipes: [],
        title: "",
        image: "",
        idAPI: "",
        ingredients: [],
        instructions: [],
        missingIngredients: [],
        spoonRecipe: [],
        showForm: true,
        spoonRecipeSteps: []
    }
    componentDidMount() {
        this.loadRecipes();
        this.contentChooser(this.props.location.state);
        
    }
    contentChooser (obj) {
        if (obj === undefined) {
            console.log("No data");
        } else {
            let spoonacularObject = obj.recipeData;
            this.setState({ spoonRecipe: spoonacularObject });
            this.setState({ showForm: false });
            this.loadRecipeInstructions(obj.recipeData.id);
        }
    }
    loadRecipeInstructions = id => {
        API.getInstructions(id)
            .then(res => this.setState({spoonRecipeSteps: res.data[0].steps}))
            .catch(err => console.log(err));
    }
    loadRecipes = () => {
        API.getRecipes()
            .then(res=> this.setState({ recipes: res.data }, () => {console.log(this.state.recipes)}))
            .catch(err=> console.log(err));
            
    }
    deleteRecipe = id => {
        API.deleteRecipe(id)
          .then(res => window.location.reload(false))
          .catch(err => console.log(err));
    };
    saveRecipe(obj) {
        let ingredients = [];
        let combinedIngredients = obj.ingredients.concat(obj.missingIngredients);
        combinedIngredients.map(ingredient => {
            let ingredientObj = {
                amount: ingredient.amount,
                unit: ingredient.unit,
                name: ingredient.name,
                id: ingredient.id
            }
            ingredients.push(ingredientObj);
        })
        let instructions = [];
        obj.instructions.map(instruction => {
            let instructionObj = {
                number: instruction.number,
                step: instruction.step
            }
            instructions.push(instructionObj);
        })
        
        API.saveRecipe({
            title: obj.title,
            image: obj.image,
            idAPI: obj.id,
            instructions: instructions,
            ingredients: ingredients
        })
        .then(res => window.location.reload(false))
        .catch(err => console.log(err));
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title && this.state.ingredients) {
            API.saveRecipe({
                title: this.state.title,
                image: this.state.image,
                ingredients: [this.state.ingredients],
                instructions: this.state.instructions
            })
            .then(res => window.location.reload(false))
            .catch(err => console.log(err));
        }
    }
    
    render() {
        const showForm = this.state.showForm;
        let recipeField = null;
        if (showForm) {
            recipeField = <RecipeForm
                        handleInputChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                        title={this.state.title}
                        image={this.state.image}
                        ingredients={this.state.ingredients}
                        instructions={this.state.instructions}
                        />
        } else {
            recipeField = <RecipeSlide
                            title={this.state.spoonRecipe.title}
                            id={this.state.spoonRecipe.id}
                            key={this.state.spoonRecipe.id}
                            image={this.state.spoonRecipe.image}
                            summary={this.state.spoonRecipe.summary}
                            instructions={this.state.spoonRecipeSteps}
                            ingredients={this.state.spoonRecipe.usedIngredients}
                            missingIngredients={this.state.spoonRecipe.missingIngredients}
                            saveCB={this.saveRecipe}
                          />
        }

        return(
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Recipes</h1>
                        </Jumbotron>
                        { recipeField }
                       
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                        <h1>Recipe List</h1>
                        </Jumbotron>
                        {this.state.recipes.length ? (
                        <List>
                            {this.state.recipes.map(recipe => (
                            <ListItem key={recipe._id}>
                                <Link to={"/recipes/" + recipe._id}>
                                <strong>
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
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Recipes;