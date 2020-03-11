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
      recipes: []
    };
    componentDidMount() {
        this.loadRecipes();
        this.loadIngredients();
    }
    loadRecipes = () => {
        API.getRecipes()
          .then(res =>
            console.log(res.data)
          )
          .catch(err => console.log(err));
    };
    loadIngredients = () => {
        API.getIngredients()
            .then(res=> {
                this.jsonConverter(res.data);
            })
            .catch(err => console.log(err));
    }
    jsonConverter = json => {
        var array = [];
        json.map(ingredient => {
            console.log(ingredient.name);
            array.push(ingredient.name);
        });
        pantryConcatenator(array);
    }
    pantryConcatenator = array => {
        let finalEl = array[array.length - 1];
        let pantryQuery = "";
        array.map(ingredient => {
            if (ingredient === finalEl) {
                pantryQuery += ingredient;
                console.log(pantryQuery);
            } else {
                pantryQuery += ingredient + ",+";
                console.log(pantryQuery);
            }
        });
    }
}