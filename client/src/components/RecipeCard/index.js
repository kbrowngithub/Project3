import React from 'react';
import { Button, Card } from 'react-bootstrap';

function RecipeCard(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.summary}
                </Card.Text>
                <Button variant="primary">Checkout the Recipe</Button>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard;