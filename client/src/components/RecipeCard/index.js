import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

function RecipeCard(props) {
    return (
        <Card key={props.key} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.summary}
                </Card.Text>
                <Link variant="primary" to={{
                    pathname:'/Recipes',
                    state: {
                        recipeData: props
                    }
                }}>Checkout the Recipe</Link>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard;