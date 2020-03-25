import React, { Component } from 'react';

class QuantityBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
      id: props.id
    };
  }

  IncrementItem = () => {
    this.setState({ quantity: this.state.quantity + 1 }, () => {
      this.props.updateQuantityCB(this.state.id, this.state.quantity);
    });
  }
  DecreaseItem = () => {
    if (this.state.quantity == "") {
      console.log("Negativity is illegal sir")
    } else {
      this.setState({ quantity: this.state.quantity - 1 }, () => {
        this.props.updateQuantityCB(this.state.id, this.state.quantity);
      });
    }
  }


  render() {
    return (
      <div>
        <button onClick={this.DecreaseItem}>{"<--"}</button>
        {"    " + this.state.quantity + "   "}
        <button onClick={this.IncrementItem}>{"-->"}</button>
        
      </div>
    );
  }
}

export default QuantityBtn;