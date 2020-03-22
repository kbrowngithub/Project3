import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List"

class Detail extends Component {
  state = {
    recipe: {},
    ingredients: [],
    instructions: []
  };
  // When this component mounts, grab the recipe with the _id of this.props.match.params.id
  // e.g. localhost:3000/recipes/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getRecipe(this.props.match.params.id)
      .then(res => {
        this.setState({ recipe: res.data })
        this.setState({ ingredients: res.data.ingredients });
        this.setState({ instructions: res.data.instructions });
      })
      .catch(err => console.log(err));

  }


  render() {
    return (
      <Container fluid>
        <div className="bordered column savedRecipe">
    
        <Row>
          <Col size="md-10 md-offset-1">
            <div key={this.state.recipe._id}>
              <h1 className="heading recipeHeading">{this.state.recipe.title}</h1>
              <p className="backing">{this.state.recipe.summary}</p>
              <List>
                <strong>Ingredients</strong>
                {this.state.ingredients.map(ingredient => (
                  <ListItem key={ingredient.id}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </ListItem>
                ))}
              </List>
              <List>
                <strong>Instructions</strong>
                {this.state.instructions.map(step => (
                  <ListItem key={this.state.recipe.key++}>
                    {step.number}: {step.step}
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
        </div>
      </Container>
    );
  }
}

export default Detail;
