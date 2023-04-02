import { Component } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

import AuthService from '../../../services/auth.services'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            pwd: '',
            name: '',
            surname: '',
            username: '',
        }
        this.authService = new AuthService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleFormSubmit = e => {

        e.preventDefault()

        const { email, pwd, name, surname, username } = this.state

        this.authService
            .signup(email, pwd, name, surname, username)
            .then(() => this.props.history.push('/logIn'))          // Redirect with props
            .catch(err => this.props.handleAlert(err.response.data.err, 10000, 'warning', true))
            // .catch(err => console.log(JSON.stringify(err)))
            // .catch(err => this.props.handleAlert(err.response ? err.response.data.err : err.message, 10000, 'warning', true))
            // .catch(err => console.log(err))
    }


    render() {
        return (

            <Container>

                <Row>

                    <Col md={{ span: 4, offset: 4 }}>

                        <h1>Sign Up</h1>

                        <hr></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Form.Group controlId="email">
                                <Form.Label>Email*</Form.Label>
                                <Form.Control type="text" value={this.state.email} onChange={this.handleInputChange} name="email" />
                            </Form.Group>

                            <Form.Group controlId="pwd">
                                <Form.Label>Password*</Form.Label>
                                <Form.Control type="password" value={this.state.pwd} onChange={this.handleInputChange} name="pwd" />
                            </Form.Group>

                            <Form.Group controlId="username">
                                <Form.Label>Pseudonim*</Form.Label>
                                <Form.Control type="text" value={this.state.username} onChange={this.handleInputChange} name="username" />
                            </Form.Group>

                            {/* <Form.Group controlId="name">
                                <Form.Label>Prenume</Form.Label>
                                <Form.Control type="text" value={this.state.name} onChange={this.handleInputChange} name="name" />
                            </Form.Group>

                            <Form.Group controlId="surname">
                                <Form.Label>Nume de familie</Form.Label>
                                <Form.Control type="text" value={this.state.surname} onChange={this.handleInputChange} name="surname" />
                            </Form.Group> */}

                            <Button style={{ marginTop: '20px', width: '100%' }} variant="dark" type="submit">Sign Up</Button>

                        </Form>

                    </Col>
                </Row>

            </Container >

        )
    }
}


export default Signup