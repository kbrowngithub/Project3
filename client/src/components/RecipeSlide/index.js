import React from 'react';
import { List, ListItem } from "../List"
import { Button } from 'react-bootstrap';
function RecipeSlide(props) {

        return( 
            <div key={props.key}>
                <h1>{props.title}</h1>
                <image src={props.image} alt="Recipe Image"></image>
                <p>{props.summary}</p>
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