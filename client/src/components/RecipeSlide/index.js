import React from 'react';
import { List, ListItem } from "../List"
import { Button } from 'react-bootstrap';
function RecipeSlide(props) {
    var cleanText = props.summary.replace(/<\/?[^>]+(>|$)/g, "")
    console.log(props.instructions);
        return( 
            <div key={props.id}>
                <h1>{props.title}</h1>
                <image src={props.image} alt="Recipe Image"></image>
                <p>{cleanText}</p>
                <List>
                    <strong>Ingredients</strong>
                    {props.ingredients.map(ingredient=> (
                        <ListItem key={ingredient.id}>
                            {ingredient.amount} {ingredient.unit} of {ingredient.name}
                        </ListItem>
                    ))}
                </List>
                <List>
                    <strong>Missing Ingredients</strong>
                    {props.missingIngredients.map(ingredient=> (
                        <ListItem key={ingredient.id}>
                            {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </ListItem>
                    ))}
                </List>
                <List>
                    <strong>Instructions</strong>
                    {props.instructions.map(step => (
                        <ListItem key={props.key}>
                            {step.number}: {step.step}
                        </ListItem>

                    ))}
                </List>
                <Button onClick={() => {props.saveCB(props)}}>Save to your Favourites</Button>
            </div>
        )
}   
export default RecipeSlide