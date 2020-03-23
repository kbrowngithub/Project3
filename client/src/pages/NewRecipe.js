import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../components/List"
import { Button } from 'react-bootstrap';
import API from "../utils/API";
import './assets/css/resultstyles.css';

class Detail extends Component {
    state = {
        recipe: {},
        instructions: [],
        cleanText: "",
        ingredients: [],
        missingIngredients: []
    };
    // When this component mounts, grab the recipe with the _id of this.props.match.params.id
    // e.g. localhost:3000/recipes/599dcb67f0f16317844583fc
    componentDidMount() {
        this.setState({ recipe: this.props.location.state.recipeData });
        this.loadRecipeInstructions(this.props.match.params.id);
        this.loadRecipeSumm(this.props.match.params.id);
        this.setState({ ingredients: this.props.location.state.recipeData.usedIngredients })
        this.setState({ missingIngredients: this.props.location.state.recipeData.missingIngredients })
    }
    loadRecipeInstructions = id => {
        API.getInstructions(id)
            .then(res => this.setState({ instructions: res.data[0].steps }))
            .catch(err => console.log(err));
    }
    loadRecipeSumm = id => {
        API.searchSumms(id)
            .then(res => {
                this.setState({ cleanText: res.data.summary.replace(/<\/?[^>]+(>|$)/g, "") })
            })
            .catch(err => console.log(err));
    }
    saveRecipe = () => {
        let ingredients = [];
        let combinedIngredients = this.state.ingredients.concat(this.state.missingIngredients);
        combinedIngredients.map(ingredient => {
            let ingredientObj = {
                amount: ingredient.amount,
                unit: ingredient.unit,
                name: ingredient.name,
                id: ingredient.id
            }
            ingredients.push(ingredientObj);
        });
        let instructions = [];
        this.state.instructions.map(instruction => {
            let instructionObj = {
                number: instruction.number,
                step: instruction.step
            }
            instructions.push(instructionObj);
        });
        API.saveRecipe({
            title: this.state.recipe.title,
            image: this.state.recipe.image,
            idAPI: this.state.recipe.id,
            instructions: instructions,
            ingredients: ingredients,
            summary: this.state.cleanText
        })
            .then(res => null)
            .catch(err => console.log(err));
    }
    render() {
        return (
            <Container fluid>
                <div className="resultContainer">
                    <Row>
                        <Col size="md-12">
                            <h2 className="drinkTitle">
                                {this.state.recipe.title}
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <div className="centerResult">
                            <Col size="md-10 md-offset-1">
                                <div key={this.state.recipe.id}>
                                    <image src={this.state.recipe.image} alt="Recipe Image"></image>
                                    <p className="teaser">{this.state.cleanText}</p>

                                    <List>
                                        <strong>Ingredients</strong>
                                        <div className="font">
                                            {this.state.ingredients.map(ingredient => (
                                                <ListItem key={ingredient.id}>
                                                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                                                </ListItem>
                                            ))}
                                        </div>
                                    </List>
                                    <br></br>
                                    <List>
                                        <strong>Missing Ingredients</strong>
                                        <div className="font">
                                            {this.state.missingIngredients.map(ingredient => (
                                                <ListItem key={ingredient.id}>
                                                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                                                </ListItem>
                                            ))}
                                        </div>
                                    </List>
                                    <br></br>
                                    <List>
                                        <strong>Instructions</strong>
                                        <div className="font">
                                            {this.state.instructions.map(step => (
                                                <ListItem key={this.state.recipe.key}>
                                                    {step.number}: {step.step}
                                                </ListItem>

                                            ))}
                                        </div>
                                    </List>
                                    <br></br>
                                    <Button className="saveButton standardButton" variant="light" onClick={() => { this.saveRecipe() }}>Save to your Favorites</Button>
                                </div>
                            </Col>
                        </div>
                    </Row>
                    <br></br>
                    <Row>
                        <Col size="md-4">
                            <Link className="colorBlack" to="/">← Back to Recipes</Link>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

export default Detail;
