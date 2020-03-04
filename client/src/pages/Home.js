import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

//constructs exercise
export default class Home extends Component {
    // constructor(props) {
    //     //all constructors in React needs to start with super(props)
    //     super(props);
    //     //binds "this" to each method
    //     this.onChangeDescription = this.onChangeDescription.bind(this);
    //     this.onChangeUsername = this.onChangeUsername.bind(this);
    //     this.onChangeDuration = this.onChangeDuration.bind(this);
    //     this.onChangeDate = this.onChangeDate.bind(this);
    //     this.onSubmit = this.onSubmit.bind(this);
    //     //creates properties. State updates page with new values
    //     this.state = {
    //         username: '',
    //         description: '',
    //         duration: 0,
    //         date: new Date(),
    //         users: []
    //     }
    // }

    // //React lifecycle method.
    // componentDidMount() {
    //     //gets all users from db & ensures there is at least one user in db. Returns user names.
    //     axios.get('http://localhost:5000/users/')
    //         .then(response => {
    //             if (response.data.length > 0) {
    //                 this.setState({
    //                     users: response.data.map(user => user.username),
    //                     username: response.data[0].username
    //                 })
    //             }
    //         })
    // }

    // //sets state after changing/creating user name
    // onChangeUsername(e) {
    //     this.setState({
    //         username: e.target.value
    //     });
    // }
    // //sets state after changing/creating descriptionnpm 
    // onChangeDescription(e) {
    //     this.setState({
    //         description: e.target.value
    //     });
    // }
    // //sets state after changing/creating duration
    // onChangeDuration(e) {
    //     this.setState({
    //         duration: e.target.value
    //     });
    // }
    // //sets state after changing/creating date
    // onChangeDate(date) {
    //     this.setState({
    //         date: date
    //     });
    // }
    // //when submit button clicked, creates exercise
    // onSubmit(e) {
    //     e.preventDefault();

    //     const exercise = {
    //         username: this.state.username,
    //         description: this.state.description,
    //         duration: this.state.duration,
    //         date: this.state.date
    //     }
    //     console.log(exercise);
    //     //adds exercise to db through axios Post
    //     axios.post('http://localhost:5000/exercises/add', exercise)
    //         .then(res => console.log(res.data));
    //     //reroutes browser to home
    //     window.location = '/';
    // }

    //renders Create Exercise form
    render() {
        return (
            <div>
                <h3>Saved Recipes</h3>
                <Button variant="primary">Go somewhere</Button>
                {/* <div class="row styled-row">
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div> */}
                {/* <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
      
                <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                </div>

                <div class="row styled-row">
                <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                
                <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
      
                <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                </div>

                <div class="row styled-row">
                <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                
                <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
      
                <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                </div> */}

            </div >
        )
    }
}