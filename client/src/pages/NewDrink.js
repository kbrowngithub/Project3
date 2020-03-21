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
        ingredients: [],
        instructions: []
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
                })
                this.ingredientParser(drink);
                this.instructionSplit(drink);
            })
            .catch(err => console.log(err));
    }

    ingredientParser = obj => {
        let ingredients = [];

        let ingredientKeys = Object.keys(obj).filter(propertyName => {
            return propertyName.indexOf("strIngredient") === 0;
        });           
        
        let measureKeys = Object.keys(obj).filter(propName => {
            return propName.indexOf("strMeasure") === 0;
        });
        
        for (let i = 0; i < ingredientKeys.length; i++) {
            if (obj[measureKeys[i]] !== null && obj[ingredientKeys[i]] !== null) {
            ingredients.push(obj[measureKeys[i]] + " " + obj[ingredientKeys[i]] );
            }
        }
        this.setState({ ingredients: ingredients });
    }

    instructionSplit = obj => {
        const instructions = obj.strInstructions;
        const sentence = instructions.split('.');
        const cleanArray = sentence.splice(0, sentence.length-1);
        this.setState({ instructions: cleanArray })
    }
    saveDrink = () => {
        API.saveDrink({
            idDrink: this.state.drink.idDrink,
            image: this.state.drink.strDrinkThumb,
            title: this.state.drink.strDrink,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions
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
                                {this.state.drink.strDrink}
                            </h1>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-10 md-offset-1">
                        <div key={this.state.drink.id}>
                            <h1>{this.state.drink.strDrink}</h1>
                            <image src={this.state.drink.strDrinkThumb} alt="Drink Image"></image>
                            <List>
                                <strong>Ingredients</strong>
                                {this.state.ingredients.map(ingredient => (
                                    <ListItem key={this.state.ingredients.indexOf(ingredient)}>
                                        {ingredient} 
                                    </ListItem>
                                ))}
                            </List>
         
                            <List>
                                <strong>Instructions</strong>
                                {this.state.instructions.map(step => (
                                        <ListItem key={this.state.instructions.indexOf(step)}>
                                            {this.state.instructions.indexOf(step) + 1}: {step}
                                        </ListItem>
                                ))}
                            </List>
            
                            <Button onClick={() => { this.saveDrink() }}>Save to your Favourites</Button>
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