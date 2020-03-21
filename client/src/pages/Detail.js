import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { List, ListItem } from "../components/List"
import { EditBtn } from "../components/DeleteBtn";
import { TitleForm, SummForm, IngredientForm } from "../components/EditForms";
// import { Title } from "react-bootstrap/lib/Modal";
class Detail extends Component {
  state = {
    recipe: {},
    ingredients: [],
    instructions: [],
    field: "",
    title: "",
    summ: "",
    image: ""
  };
  // When this component mounts, grab the recipe with the _id of this.props.match.params.id
  // e.g. localhost:3000/recipes/599dcb67f0f16317844583fc
  componentDidMount() {
    this.loadRecipe(this.props.match.params.id);
  }
  loadRecipe = (id) => {
    API.getRecipe(id)
      .then(res => {
        this.setState({
          recipe: res.data,
          ingredients: res.data.ingredients,
          title: res.data.title,
          summ: res.data.summary,
          image: res.data.image,
          instructions: res.data.instructions
        });
      })
      .catch(err => console.log(err));
  }

  editRecipe = (field) => {
    switch (field) {
      case "title":
        this.setState({ field: field });
        break;
      case "summary":
        this.setState({ field: field });
        break;
      case "ingredients":
        this.setState({ field: field });
        break;
      case "instructions":
        this.setState({ field: field });
        break;
    }

  }
  updateField = (data) => {
    if (data !== undefined) {
      let recipe = this.state.recipe
      let id = recipe._id
      console.log(data);
      console.log(this.state.field);
      switch (this.state.field) {
        case "title":
          recipe.title = data.title
          break;
        case "summary":
          recipe.summary = data.summary
          break;
        case "ingredients":
          recipe.ingredients = data.ingredients
          break;
        case "instructions":
          recipe.instructions = data.instructions
          break;
      }
      this.setState({ field: "" });
      console.log(recipe)
      API.updateRecipe({
        id: recipe._id,
        newData: recipe
      })
        .then(res => this.loadRecipe(id))
        .catch(err => console.log(err));
    }

  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              {this.state.field === "title" ? (
                <TitleForm
                  key={this.state.recipe._id}
                  value={this.state.title}
                  updateField={this.updateField}
                  handleInputChange={this.handleInputChange}
                />
              ) : (
                  <div>
                    <h1>
                      {this.state.title}
                    </h1>
                    <EditBtn onClick={() => this.editRecipe("title")}></EditBtn>
                  </div>
                )}
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <div key={this.state.recipe._id}>

              <h1>{this.state.recipe.title}</h1>
              <image src={this.state.recipe.image} alt="Recipe Image"></image>
              {this.state.field === "summary" ? (
                <SummForm
                  key={this.state.recipe._id}
                  value={this.state.summ}
                  updateField={this.updateField}
                  handleInputChange={this.handleInputChange}
                />
              ) : (
                  <span>
                    <EditBtn onClick={() => this.editRecipe("summary")}></EditBtn>
                    <p>{this.state.recipe.summary}</p>
                  </span>
                )}

              {this.state.field === "ingredients" ? (
                <IngredientForm
                  key={this.state.recipe._id}
                  value={this.state.recipe.ingredients}
                  updateField={this.updateField}
                  handleInputChange={this.handleInputChange}
                />
              ) : (

                  <List>

                    <span><strong>Ingredients</strong>
                      <EditBtn onClick={() => this.editRecipe("ingredients")}></EditBtn>
                    </span>
                    {this.state.ingredients.map(ingredient => (
                      <ListItem key={ingredient.id}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </ListItem>
                    ))}

                  </List>
                )}
              {this.state.field === "instructions" ? (
                <IngredientForm
                  key={this.state.recipe._id}
                  value={this.state.recipe.ingredients}
                  updateField={this.updateField}
                  handleInputChange={this.handleInputChange}
                />
              ) : (
                  <List>
                    <strong>Instructions</strong>
                    <EditBtn onClick={() => this.editRecipe("instructions")}></EditBtn>
                    {this.state.instructions.map(step => (
                      <ListItem key={this.state.recipe.key++}>
                        {step.number}: {step.step}
                      </ListItem>
                    ))}
                  </List>
                )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Recipes</Link>

          </Col>
        </Row>
      </Container >
    );
  }
}

export default Detail;
