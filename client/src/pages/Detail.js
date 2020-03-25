import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API";
import { List, ListItem } from "../components/List"
import { EditBtn } from "../components/DeleteBtn";
import { TitleForm, SummForm, NoteForm } from "../components/EditForms";
// import { Title } from "react-bootstrap/lib/Modal";
class Detail extends Component {
  state = {
    userEmail: '',
    recipe: {},
    ingredients: [],
    instructions: [],
    field: "",
    title: "",
    summ: "",
    image: "",
    notes: ""
  };
  // When this component mounts, grab the recipe with the _id of this.props.match.params.id
  // e.g. localhost:3000/recipes/599dcb67f0f16317844583fc
  componentDidMount() {
    this.setState({ userEmail: JSON.parse(sessionStorage.getItem("UserEmail")) })
    this.loadRecipe(this.props.match.params.id);
  }
  loadRecipe = id => {
    API.getRecipes()
      .then(res => {
        var index = res.data.map(x => x.userEmail).indexOf(this.state.userEmail);
        var recipesList = res.data[index].recipes;
        var thisRecipe = recipesList.filter(obj => obj._id === id);
        this.checkNotes(thisRecipe[0]);
        this.setState({
          recipe: thisRecipe[0],
          ingredients: thisRecipe[0].ingredients,
          title: thisRecipe[0].title,
          summ: thisRecipe[0].summary,
          image: thisRecipe[0].image,
          instructions: thisRecipe[0].instructions
        });
      })
      .catch(err => console.log(err));
  }
  checkNotes = (data) => {
    if (data.notes === undefined) {
      this.setState({ notes: "" })
    } else {
      this.setState({ notes: data.notes })
    }
  }
  editRecipe = (field) => {
    switch (field) {
      case "title":
        this.setState({ field: field });
        break;
      case "summary":
        this.setState({ field: field });
        break;
      case "notes":
        this.setState({ field: field });
        break;
    }

  }
  updateField = (data) => {
    if (data !== undefined) {
      let recipe = this.state.recipe
      let id = recipe._id
      switch (this.state.field) {
        case "title":
          recipe.title = data.title;
          break;
        case "summary":
          recipe.summary = data.summary;
          break;
        case "notes":
          recipe.notes = data.notes
          break;
      }
      this.setState({ field: "" });
      delete recipe.key;
      delete recipe.date;
      API.updateRecipe({
        email: this.state.userEmail,
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
        <div className="bordered column savedRecipe">

          <Row>
            <Col size="md-10 md-offset-1">
              <div key={this.state.recipe._id}>
                {this.state.field === "title" ? (
                  <TitleForm
                    value={this.state.title}
                    updateField={this.updateField}
                    handleInputChange={this.handleInputChange}
                  />
                ) : (
                    <span>
                      <EditBtn onClick={() => this.editRecipe("title")}></EditBtn>
                      <h1 className="heading recipeHeading">{this.state.recipe.title}</h1>

                    </span>
                  )}

                {this.state.field === "summary" ? (
                  <SummForm
                    value={this.state.summ}
                    updateField={this.updateField}
                    handleInputChange={this.handleInputChange}
                  />
                ) : (
                    <span>
                      <EditBtn onClick={() => this.editRecipe("summary")}></EditBtn>
                      <p className="backing">{this.state.recipe.summary}</p>
                    </span>
                  )}

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
                {this.state.field === "notes" ? (
                  <span>
                    <strong>Notes</strong>
                    <NoteForm
                      ph={"I only use 2 eggs for this recipe"}
                      value={this.state.notes}
                      updateField={this.updateField}
                      handleInputChange={this.handleInputChange}
                    />
                  </span>
                ) : (
                    <span>
                      <strong>Notes</strong>
                      <br></br>
                      {this.state.notes.length > 0 ? (

                        <span>
                          {this.state.notes}
                        </span>
                      ) : (
                          <span>
                            
                      Customize recipe by noting your own preferences

                          </span>
                        )}
                      <EditBtn onClick={() => this.editRecipe("notes")}>Add Notes</EditBtn>
                    </span>
                  )}
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
