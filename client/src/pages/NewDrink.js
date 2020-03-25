import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List"
import { Button } from 'react-bootstrap';
import API from "../utils/API";
import './assets/css/resultstyles.css';

class Detail extends Component {
    state = {
        userEmail: "",
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
        this.setState({ userEmail: JSON.parse(sessionStorage.getItem("UserEmail")) })
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
                ingredients.push(obj[measureKeys[i]] + " " + obj[ingredientKeys[i]]);
            }
        }
        this.setState({ ingredients: ingredients });
    }

    instructionSplit = obj => {
        const instructions = obj.strInstructions;
        const sentence = instructions.split('.');
        const cleanArray = sentence.splice(0, sentence.length - 1);
        const ruleArr = cleanArray.filter(el => el.length > 3);
        this.setState({ instructions: ruleArr })
    }
    saveDrink = () => {
        API.saveDrink({
            userEmail: this.state.userEmail,
            drink: {
                idDrink: this.state.drink.idDrink,
                image: this.state.drink.strDrinkThumb,
                title: this.state.drink.strDrink,
                ingredients: this.state.ingredients,
                instructions: this.state.instructions
            }
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
                                {this.state.drink.strDrink}
                            </h2>
                        </Col>

                    </Row>

                    <Row>

                        <Col size="md-10 md-offset-1">
                            <div key={this.state.drink.id}>
                                <List>
                                    <strong>Ingredients</strong>
                                    <div className="font">
                                        {this.state.ingredients.map(ingredient => (
                                            <ListItem key={this.state.ingredients.indexOf(ingredient)}>
                                                {ingredient}
                                            </ListItem>
                                        ))}
                                    </div>
                                </List>
                                <br></br>
                                <List>
                                    <strong>Instructions</strong>
                                    <div className="font">
                                        {this.state.instructions.map(step => (
                                            <ListItem key={this.state.instructions.indexOf(step)}>
                                                {this.state.instructions.indexOf(step) + 1}: {step}
                                            </ListItem>
                                        ))}
                                    </div>
                                </List>
                                <br></br>
                                <Button className="saveButton standardButton" variant="light" onClick={() => { this.saveDrink() }}>Save to Favorites</Button>

                            </div>
                        </Col>

                    </Row>
                    <br></br>
                    <Row>

                        <Col size="md-4">
                            <Link className="colorBlack" to="/">← Back to Home</Link>
                            <Link className="colorBlack" to="/recipes">Go to Recipes →</Link>
                        </Col>
                    </Row>

                </div>
            </Container>
        );
    }
}

export default Detail;