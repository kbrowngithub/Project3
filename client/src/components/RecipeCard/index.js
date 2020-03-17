import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

function RecipeCard(props) {
    var shortText = props.summary.substr(0, 200);
    var cleanText = shortText.replace(/<\/?[^>]+(>|$)/g, "") + "...";
    return (
        <Card key={props.key} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {cleanText}
                </Card.Text>
                <Link variant="primary" to={{
                    pathname:'/recipes/new/' + props.id,
                    state: {
                        recipeData: props
                    }
                }}>Checkout the Recipe</Link> 
                <p>Missing {props.missingIngredients.length} Ingredient(s)</p>
                
            </Card.Body>
        </Card>
    )
}

export default RecipeCard;