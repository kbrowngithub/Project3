import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import { Button } from 'react-bootstrap';

class Detail extends Component {
    state = {
        drink: {},
        ingredients: [],
        instructions: []
    };
    // When this component mounts, grab the recipe with the _id of this.props.match.params.id
    // e.g. localhost:3000/recipes/599dcb67f0f16317844583fc
    componentDidMount() {
        this.loadDrink(this.props.match.params.id);
    }
    loadDrink = (id) => {
        API.loadDrink(id)
            .then(res=> {
                this.setState({
                    drink: res.data,
                    ingredients: res.data.ingredients,
                    instructions: res.data.instructions
                })
            })
            .catch(err => console.log(err));
    }
  
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>
                                {this.state.drink.title}
                            </h1>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-10 md-offset-1">
                        <div key={this.state.drink._id}>
                            <h1>{this.state.drink.title}</h1>
                            <image src={this.state.drink.image} alt="Drink Image"></image>
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