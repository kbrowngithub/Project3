import React, { Component, useState } from 'react';

const CardDealer = (props) => {
    const [displayCards, setDisplayCards] = React.useState(false);

    if (displayCards) {
        return <div>Is there anybody in there?</div>
    }
    
    return <div>Just nod if you can HEMMEH</div>
}

export default CardDealer;