import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../components/List"
import { Button } from 'react-bootstrap';
import API from "../utils/API";

class Detail extends Component {
    state = {
        drink: {},
        ingredients: []
    };
    // When this component mounts, grab the recipe with the _id of this.props.match.params.id
    // e.g. localhost:3000/recipes/599dcb67f0f16317844583fc
    componentDidMount() {
        console.log(this.props.location.state.drinkData);
        console.log(this.props.match.params.id);
        this.loadDrinkDetails(this.props.match.params.id);
    }
    
    loadDrinkDetails = (id) => {
        API.searchDrinkDetails(id)
            .then(res => {
                const drink = res.data.drinks[0];
                this.setState({ 
                    drink: drink
                }, ()=> console.log(this.state.drink))
                this.ingredientParser(drink);
            })
            .catch(err => console.log(err));
    }

    ingredientParser = obj => {
        let ingredientKeys = Object.keys(obj).filter(propertyName => {
            return propertyName.indexOf("strIngredient") === 0;
        });    
        
        let ingredients = [];
        
        
        let measureKeys = Object.keys(obj).filter(propName => {
            return propName.indexOf("strMeasure") === 0;
        });
        
        for (let i = 0; i < ingredientKeys.length; i++) {
            if (obj[measureKeys[i]] !== null && obj[ingredientKeys[i]] !== null) {
            ingredients.push(obj[measureKeys[i]] + "of " + obj[ingredientKeys[i]] );
            }
        }
        this.setState({ ingredients: ingredients }, () => console.log(this.state.ingredients));
    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>
                                {this.state.drink.strDrink}
                            </h1>
                        </Jumbotron>
                    </Col>
                </Row>
                {/* <Row>
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
                </Row> */}
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