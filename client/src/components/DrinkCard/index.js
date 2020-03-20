import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './styles.css';

function DrinkCard(props) {
    console.log(props);
    return (
        <Card className ="cardFull">
            <Card.Img src={props.image} />
            <Card.Body>
                <Card.Title className="cardTitle">{props.title}</Card.Title>
                <Link className="cardButton"
                variant="primary" to={{
                    pathname:'/drinks/new/' + props.id,
                    state: {
                        drinkData: props
                    }
                }}>Check It Out</Link> 
            </Card.Body>
        </Card>
    )
}

export default DrinkCard;