import React from 'react';
import { Button, Card } from 'react-bootstrap';

function DrinkCard(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Button variant="primary">Checkout the Drink</Button>
            </Card.Body>
        </Card>
    )
}

export default DrinkCard;