import React, { Component } from 'react';
import { RenderTableData, RenderTableHeader } from "../components/Table";
import { IngredientForm, DrinkForm } from '../components/NewIngredientForm';
import API from "../utils/API";
import { List, ListItem } from '../components/List';
import DeleteBtn from '../components/DeleteBtn';
class IngredientList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: "",
      ingredients: [],
      liquors: [],
      newIngredient: "",
      newQuantity: "",
      newUnit: "",
      newDrink: ""
    }
  }
  componentDidMount() {
    this.setState({ userEmail: JSON.parse(sessionStorage.getItem("UserEmail")) })

    if (this.state.userEmail !== null) {
      this.loadLiquors();
      this.loadIngredients();
    }
  }

  updateQuantity = (id, int) => {
    API.updateIngredient({ id: id, quantity: int, email: this.state.userEmail })
      .then(res => null)
      .catch(err => console.log(err));
  }

  loadIngredients = () => {
    API.getIngredients()
      .then(res => {

        var index = res.data.map(x => x.userEmail).indexOf(this.state.userEmail);
        var ingredientList = res.data[index].ingredients

        this.setState({ ingredients: ingredientList });
      })
      .catch(err => console.log(err));
  }

  loadLiquors = () => {
    API.getLiquors()
      .then(res => {
        var index = res.data.map(x => x.userEmail).indexOf(this.state.userEmail);
        var liquorList = res.data[index].liquors;
        this.setState({ liquors: liquorList });
      })
      .catch(err => console.log(err))
  }

  addIngredient = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });

  }

  deleteIngredient = id => {
    API.deleteIngredient({ id: id, email: this.state.userEmail })
      .then(res => this.loadIngredients())
      .catch(err => console.log(err));
  }

  deleteLiquor = id => {
    API.deleteLiquor({ id: id, email: this.state.userEmail })
      .then(res => this.loadLiquors())
      .catch(err => console.log(err));
  }


  sendIngredient = data => {
    API.saveIngredient({
      userEmail: this.state.userEmail,
      ingredients: {
        name: data.newIngredient,
        quantity: data.newQuantity,
        unit: data.newUnit,
      }
    })
      .then(res => {
        this.loadIngredients();
        this.setState({ newIngredient: "", newQuantity: "", newUnit: "" })
      })
      .catch(err => console.log(err));
  }

  sendDrink = data => {
    API.saveLiquor({
      userEmail: this.state.userEmail,
      liquors: {
        name: data.newDrink
      }
    })
      .then(res => {
        this.loadLiquors();
        this.setState({ newDrink: "" })
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <container>
        <div className="row mt-5">
          <div className="col-md-8 m-auto">
            <div className="bordered card card-body">
              <h1 className="heading">Pantry</h1>
              {this.state.ingredients.length ? (
                <table id='ingredients'>
                  <tbody>
                    <tr className="tableHeader">
                      <RenderTableHeader
                        header={Object.keys(this.state.ingredients[0])}
                      />
                    </tr>
                    <RenderTableData
                      ingredients={this.state.ingredients}
                      updateQuantity={this.updateQuantity}
                      deleteIngredient={this.deleteIngredient}
                    />
                  </tbody>
                </table>

              ) : (
                  <h3 className="fontStyled">No ingredients to display, add some below!</h3>
                )}
              <div className="fontNorm">
                <IngredientForm
                  newIngredient={this.state.newIngredient}
                  newQuantity={this.state.newQuantity}
                  newUnit={this.state.newUnit}
                  addIngredient={this.addIngredient}
                  sendIngredient={this.sendIngredient}
                />
              </div>

            </div>


          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8 m-auto">
            <div className="bordered card card-body">
              <h1 id="heading">Liquor Cabinent</h1>
              <List>
                {this.state.liquors.length ? (
                  <div>
                    {this.state.liquors.map(liquor => (

                      <ListItem>
                        {liquor.name}
                        <DeleteBtn onClick={() => this.deleteLiquor(liquor._id)} />
                      </ListItem>
                    ))}
                  </div>
                ) : (
                    <h3 className="fontStyled">No liquors to display</h3>
                  )}
              </List>
              <DrinkForm
                newDrink={this.state.newDrink}
                addDrink={this.addIngredient}
                sendDrink={this.sendDrink}
              />
            </div>
          </div>
        </div>
      </container>


    )
  }
}

export default IngredientList;