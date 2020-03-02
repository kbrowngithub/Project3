import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Recipes extends Component {
  state = {
    recipes: [],
    label: "",
    source: "",
    image: ""
  };

  componentDidMount() {
    this.loadRecipes();
  }

  loadRecipes = () => {
    API.getRecipes()
      .then(res =>
        this.setState({ recipes: res.data, label: "", source: "", image: "" })
      )
      .catch(err => console.log(err));
  };

  deleteRecipe = id => {
    API.deleteRecipe(id)
      .then(res => this.loadRecipes())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // label: { type: String, required: true },
  //   image: { type: String, default: "https://ezyvectors.com/wp-content/uploads//edd/2019/05/Colorful-Free-Food-Icon-Vector.jpg" },
  //   source: { type: String, required: true },
  //   url: { type: String, required: true },
  //   ingredientLines: {type: Array, required: true},
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.label && this.state.source) {
      API.saveRecipe({
        label: this.state.label,
        image: this.state.image,
        source: this.state.source,
        url: "http://www.edamam.com/recipe/oven-roasted-bbq-chicken-thighs-deb32477acd2ad8c18e6a74df29fd153/bbq",
        ingredientLines: [
          "3 cups Your Favorite BBQ Sauce",
          "1/2 cup Peach Preserves",
          "1 clove Garlic",
          "Hot Sauce, Optional",
          "12 whole Chicken Thighs, Bone-in, Skin-on",
          "Olive Oil For Brushing"
          ]
      })
        .then(res => this.loadRecipes())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Recipes</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.label}
                onChange={this.handleInputChange}
                name="label"
                placeholder="Label (required)"
              />
              <Input
                value={this.state.source}
                onChange={this.handleInputChange}
                name="source"
                placeholder="Source (required)"
              />
              <TextArea
                value={this.state.image}
                onChange={this.handleInputChange}
                name="image"
                placeholder="Image URL (Optional)"
              />
              <FormBtn
                disabled={!(this.state.source && this.state.label)}
                onClick={this.handleFormSubmit}
              >
                Submit Recipe
              </FormBtn>
            </form>
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
                        {recipe.label} by {recipe.source}
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
    );
  }
}

export default Recipes;
