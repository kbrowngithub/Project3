import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { Link } from 'react-router-dom';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-blue.css';
import './assets/css/styles.css';
import API from "../utils/API";

class Invite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      namePlaceholder: "...Enter a name for this contact",
      placeholder: "10-digit cell num or email address",
      to: '',
      cname: '',
      from: '<username goes here>',
      note: '',
      message: {
        to: '',
        body: ''
      },
      submitting: false,
      error: false
    }
  }

  componentDidMount() {
    let toAddr = (this.props.match.params.mobile === "none") ? this.props.match.params.email : this.props.match.params.mobile;
    this.setState(
      {
        cname: this.props.match.params.name,
        to: toAddr,
        message: {
          to: toAddr,
          body: ''
        },
      }
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      message: { ...this.state.message, [name]: event.target.value }
    });
  };

  // updateContact = (id, contactData) => {
  //   API.updateContact({ id: id, contact: contactData })
  //     .then(res => console.log("Contact Added"))
  //     .catch(err => console.log(err));
  // }

  normalizeCell = cellNum => {
    this.state.message.to = cellNum.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1$2$3');
  }

  handleFormSubmit = event => {
    event.preventDefault();

    const addr = this.state.message.to;
    if (!addr) {
      alert(`Must enter a valid \'To\' address (email or 10-digit cell)`);
      // } else if (/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(addr)) {
    } else if (/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(addr)) {
      this.normalizeCell(addr);
      this.handleCellFormSubmit(event);
    } else if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(addr)) {
      this.handleEmailFormSubmit(event);
    } else {
      alert(`Invalid \'To\' address: ${addr}; Must be either 10 digit cell (US) or valid email.`);
      this.setState({
        namePlaceholder: "***Enter a name for this contact",
        placeholder: "10-digit cell num or email address",
        cname: '',
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
      this.state.message.to = '+1' + this.state.message.to;
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
          API.updateContact({ userEmail: sessionStorage.getItem("UserEmail"), name: this.state.cname, mobile: this.state.message.to, email: "none" })
            .then(res => {
              sessionStorage.setItem("UserContacts", JSON.stringify(res.data.contacts));
              console.log("Contact Updated");
            })
            .catch(err => console.log(err));

          if (data.success) {
            alert(`Invite sent to ${this.state.message.to}`)
            this.setState({
              namePlaceholder: "Enter a name for this contact***",
              error: false,
              submitting: false,
              cname: '',
              to: '',
              from: '<username goes here>',
              message: {
                to: '',
                body: ''
              },
              placeholder: "10-digit cell num or email address***",
              submitting: false,
              error: false
            });
          } else {
            alert(`${data.errMsg}`);
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
          console.log(`Invite: userID = ${sessionStorage.getItem("user")}\nname:${this.state.cname}, mobile:none, email:${this.state.to}`);
          API.updateContact({ userEmail: sessionStorage.getItem("UserEmail"), name: this.state.cname, mobile: "none", email: this.state.to })
            .then(res => console.log("Contact Updated"))
            .catch(err => console.log(err));

          alert(`Invite sent to ${this.state.message.to}`)
          if (data.success) {
            this.setState({
              error: false,
              cname: '',
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
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <div className="card bordered card-body radioContainer">
              <h1 className="text-center heading mb-3">
                <i className="fas fa-user-plus"></i> Invite
              </h1>
              <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="cname">Contact Name:</label>
                  <input
                    className="form-control"
                    type="tel"
                    name="cname"
                    id="cname"
                    placeholder={this.state.namePlaceholder}
                    // value={this.state.message.to}
                    value={this.state.cname}
                    onChange={this.handleInputChange}
                  />
                </div>
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

                <button type="button"
                  // disabled={!(this.state.message.to)}
                  onClick={this.handleFormSubmit}
                  className='standardButton btn-friend btn-block'
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Invite;
