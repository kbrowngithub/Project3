import React from 'react';
import "./style.css";

import QuantityBtn from '../QuantityBtn'
import { Button } from 'react-bootstrap';

export function RenderTableData(props) {
    if (props.ingredients.length > 0) {
        console.log(props.ingredients)
        return props.ingredients.map((ingredient, index) => {
            return (
                <tr key={ingredient._id}>
                    <td>{ingredient.name}</td>
                    <td>
                        <QuantityBtn
                            id={ingredient._id}
                            quantity={ingredient.quantity}
                            updateQuantityCB={props.updateQuantity} />
                    </td>
                    <td>{ingredient.unit}</td>
                    <td className="deleteColumn"><Button className="delete" onClick={() => props.deleteIngredient(ingredient._id)}>X</Button></td>
                </tr>
            )
        });
    }
}

export function RenderTableHeader(props) {

    return props.header.map((key, index) => {
        if (index > 0 && index < 4) {
            return <th key={index}>{key.toUpperCase()}</th>
        } else if (index === 4) {
            return <th key={index}>DELETE</th>
        }

    })
}
