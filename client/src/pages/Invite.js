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
    selectedOption: "Cell#",
    placeholder: "10-digit cell num or email address",
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

  // handleRadioButtonChange = event => {
  //   console.log(`selectedOption = ${event.target.value}`);
  //   this.setState({
  //     selectedOption: event.target.value,
  //     placeholder: event.target.value
  //   })
  // }

  normalizeCell = cellNum => {
    return cellNum.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '+1$1$2$3');
  }

  handleFormSubmit = event => {
    event.preventDefault();

    const addr = this.state.message.to;
    if (!addr) {
      alert(`Must enter a valid \'To\' address (email or 10-digit cell)`);
    } else if (/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(addr)) {
      alert(`Valid cell number: ${addr}\nNormalized: ${this.normalizeCell(addr)}`);
      this.handleCellFormSubmit(event);
    } else if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(addr)) {
      alert(`Sending email to ${this.state.message.to}`);
      this.handleEmailFormSubmit(event);
    } else {
      alert(`Invalid \'To\' address: ${addr}; Must be either 10 digit cell or valid email.`);
      this.setState({
        selectedOption: "Cell#",
        placeholder: "10-digit cell num or email address",
        to: '',
        from: '<username goes here>',
        message: {
          to: ''
        },
        submitting: false,
        error: false
      });
    }
  };

  handleCellFormSubmit = event => {
    // event.preventDefault();
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
              to: '',
              from: '<username goes here>',
              message: {
                to: '',
                body: ''
              },
              placeholder: "10-digit cell num or email address",
              submitting: false,
              error: false
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
    // event.preventDefault();
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
            {/* <Jumbotron>
              <h1>Who should I invite?</h1>
            </Jumbotron> */}
            <div className="radioContainer">
              <form>

                {/* <div className="form-check fc1">
                  <label>
                    <input
                      type="radio"
                      name="msgType"
                      value="Cell#"
                      checked={this.state.selectedOption === "Cell#"}
                      onChange={this.handleRadioButtonChange}
                      className="form-check-input"
                    />
                      Send Text Msg
                    </label>
                </div>

                <div className="form-check fc2">
                  <label>
                    <input
                      type="radio"
                      name="msgType"
                      value="Email Addr"
                      checked={this.state.selectedOption === "Email Addr"}
                      onChange={this.handleRadioButtonChange}
                      className="form-check-input"
                    />
                      Send Email
                    </label>
                </div> */}

                <div className="form-group">
                  <label htmlFor="to">To:</label>
                  <input
                    className="form-control"
                    type="tel"
                    name="to"
                    id="to"
                    placeholder={this.state.placeholder}
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
                    placeholder="Message Text Here"
                    value={this.state.message.body}
                    onChange={this.handleInputChange}
                  />
                </div>

                <button
                  // disabled={!(this.state.message.to)}
                  onClick={this.handleFormSubmit}
                  className='sendButton'
                >
                  Send
                </button>

              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Invite;
