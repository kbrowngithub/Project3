import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../components/List"
import { Button } from 'react-bootstrap';
import API from "../utils/API";

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
            .catch(err=> console.log(err));
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
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>
                                {this.state.recipe.title}
                            </h1>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-10 md-offset-1">
                        <div key={this.state.recipe.id}>
                            <h1>{this.state.recipe.title}</h1>
                            <image src={this.state.recipe.image} alt="Recipe Image"></image>
                            <p>{this.state.cleanText}</p>
                            <List>
                                <strong>Ingredients</strong>
                                {this.state.ingredients.map(ingredient => (
                                    <ListItem key={ingredient.id}>
                                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                                    </ListItem>
                                ))}
                            </List>
                            <List>
                                <strong>Missing Ingredients</strong>
                                {this.state.missingIngredients.map(ingredient => (
                                    <ListItem key={ingredient.id}>
                                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                                    </ListItem>
                                ))}
                            </List>
                            <List>
                                <strong>Instructions</strong>
                                {this.state.instructions.map(step => (
                                    <ListItem key={this.state.recipe.key}>
                                        {step.number}: {step.step}
                                    </ListItem>

                                ))}
                            </List>
                            <Button onClick={() => { this.saveRecipe() }}>Save to your Favourites</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-2">
                        <Link to="/">← Back to Recipes</Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Detail;
