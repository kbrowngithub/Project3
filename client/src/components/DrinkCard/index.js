import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './styles.css';

function DrinkCard(props) {
    return (
        <Card className ="cardFull">
            <Card.Img src={props.image} />
            <Card.Body>
                <Card.Title className="cardTitle">{props.title}</Card.Title>
                <Button className="cardButton">Check It Out</Button>
            </Card.Body>
        </Card>
    )
}

export default DrinkCard;