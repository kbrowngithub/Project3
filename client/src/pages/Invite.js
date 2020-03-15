import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Link } from 'react-router-dom';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';
import './assets/css/styles.css';

function testing() {
  alert("Yup")
}

class Invite extends Component {
  state = {
    to: '',
    from: '<username goes here>',
    note: '',
    message: {
      to: '',
      body: ''
    },
    submitting: false,
    error: false
  };

  handleInputChange = event => {
    // const { name, value } = event.target;
    // this.setState({ [name]: value });
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.message.to) {
      // alert(`Sending Invite to ${this.state.to}`);
      console.log(`Sending sms to ${this.state.message.to}`);

      this.setState({ submitting: true });
      fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.message)
      })
        .then(res => res.json())
        .then(data => {
          console.log(`data.success = ${data.success}`);
          alert(`Invite sent to ${this.state.message.to}`)
          if (data.success) {
            this.setState({
              error: false,
              submitting: false,
              message: {
                to: '',
                body: ''
              }
            });
          } else {
            this.setState({
              error: true,
              submitting: false
            });
          }
        });
    } else {
      alert(`Something went wrong!`)
    }
  };

  handleEmailFormSubmit = event => {
    event.preventDefault();
    if (this.state.message.to) {
      // alert(`Sending Invite to ${this.state.to}`);
      console.log(`Sending email to ${this.state.message.to}`);

      this.setState({ submitting: true });
      fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.message)
      })
        .then(res => res.json())
        .then(data => {
          console.log(`data.success = ${data.success}`);
          alert(`Invite sent to ${this.state.message.to}`)
          if (data.success) {
            this.setState({
              error: false,
              submitting: false,
              message: {
                to: '',
                body: ''
              }
            });
          } else {
            this.setState({
              error: true,
              submitting: false
            });
          }
        });
    } else {
      alert(`Something went wrong!`)
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Who should I invite?</h1>
            </Jumbotron>
        
            <form>
              
              <div className="form-group">
                <label htmlFor="to">To:</label>
                <input
                  className="form-control"
                  type="tel"
                  name="to"
                  id="to"
                  value={this.state.message.to}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="body">Body:</label>
                <textarea
                  className="form-control" 
                  rows="4"
                  name="body"
                  id="body"
                  value={this.state.message.body}
                  onChange={this.handleInputChange}
                />
              </div>
           
              <AwesomeButton
                disabled={!(this.state.message.to)}
                onClick={this.handleEmailFormSubmit}
                type="secondary"
                size="medium"
                ripple
                className='button'
              >
                Send Email
              </AwesomeButton>
         
              <AwesomeButton
                disabled={!(this.state.message.to)}
                onClick={this.handleFormSubmit}
                type="secondary"
                size="medium"
                ripple
                className='button'
              >
                Send Text
              </AwesomeButton>
              
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Invite;
