import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import { EditBtn } from "../components/DeleteBtn";
import { TitleForm, NoteForm } from "../components/EditForms";
class Detail extends Component {
    state = {
        userEmail: '',
        drink: {},
        ingredients: [],
        instructions: [],
        field: "",
        notes: ""
    };
    // When this component mounts, grab the recipe with the _id of this.props.match.params.id
    // e.g. localhost:3000/recipes/599dcb67f0f16317844583fc
    componentDidMount() {
        this.setState({ userEmail: JSON.parse(sessionStorage.getItem("UserEmail")) });
        this.loadDrink(this.props.match.params.id);
    }
    loadDrink = (id) => {
        API.loadDrinks()
            .then(res => {
                var index = res.data.map(x => x.userEmail).indexOf(this.state.userEmail);
                var drinksList = res.data[index].drinks;
                var thisDrink = drinksList.filter(obj => obj._id === id);
                this.checkNotes(thisDrink[0]);
                this.setState({
                    drink: thisDrink[0],
                    ingredients: thisDrink[0].ingredients,
                    instructions: thisDrink[0].instructions
                })
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
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    editRecipe = (field) => {
        switch (field) {
            case "title":
                this.setState({ field: field });
                break;
            case "notes":
                this.setState({ field: field });
                break;
        }

    }
    updateField = (data) => {
        if (data !== undefined) {
            let drink = this.state.drink
            let id = drink._id
            switch (this.state.field) {
                case "title":
                    drink.title = data.title;
                    break;
                case "notes":
                    drink.notes = data.notes
                    break;
            }
            this.setState({ field: "" });
            delete drink.key;
            delete drink.date;
            API.updateDrink({
                email: this.state.userEmail,
                id: drink._id,
                newData: drink
            })
                .then(res => this.loadDrink(id))
                .catch(err => console.log(err));
        }

    }
    render() {
        return (
            <Container fluid>
                <div className="bordered column savedRecipe">
                    <Row>
                        <Col size="md-10 md-offset-1">
                            <div key={this.state.drink._id}>
                                {this.state.field === "title" ? (
                                    <TitleForm
                                        value={this.state.drink.title}
                                        updateField={this.updateField}
                                        handleInputChange={this.handleInputChange}
                                    />
                                ) : (
                                        <span>
                                            <EditBtn onClick={() => this.editRecipe("title")}></EditBtn>
                                            <h1 className="heading recipeHeading">{this.state.drink.title}</h1>

                                        </span>
                                    )}
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
                                {this.state.field === "notes" ? (
                                    <span>
                                        <strong>Notes</strong>
                                        <NoteForm
                                            ph={"Shaken, not stirred"}
                                            value={this.state.notes}
                                            updateField={this.updateField}
                                            handleInputChange={this.handleInputChange}
                                        />
                                    </span>
                                ) : (
                                        <span>
                                            <strong>Notes</strong>
                                            {this.state.notes.length > 0 ? (

                                                <span><br></br>
                                                    {this.state.notes}
                                                </span>
                                            ) : (
                                                    <span>
                                                        <br></br>
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