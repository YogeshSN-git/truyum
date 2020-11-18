import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, Nav, Navbar, Row ,Alert} from 'react-bootstrap';
import Cookies from 'universal-cookie';

class Signin extends React.Component {

    state = {
        useridError: '',
        invalidError: '',
        passwordError: '' 
    }

    componentDidMount() {
        const cookies = new Cookies();
        cookies.remove("token");
        localStorage.clear();

    }

    handleSubmit(event) {

        event.preventDefault();

        const data = {
            userId: document.getElementById("userId").value,
            password: document.getElementById("password").value
        }

        axios.post("http://localhost:8765/menuitem-service/auth/signin", data)
            .then(res => {

                const cookies = new Cookies();
                if (res.data.token !== "Invalid Username Password") {
                    cookies.set('token', res.data.token, { path: '/', expires: new Date(res.data.expiryDate) });

                    localStorage.setItem('userId', res.data.id);

                    if (res.data.roles[0] === "ROLE_USER")
                        this.props.history.push("/menuitemsuser")
                    else
                        this.props.history.push("/menuitemsadmin")
                }

                else {
                    console.log("invalid user password")
                    this.setState({ invalidError: "Invalid Username Password"})
                }
            }).catch(error => {
                console.log(error.response)

                this.setState({ useridError: (typeof error.response.data.userId !== "undefined") ? error.response.data.userId : "" })
                this.setState({ passwordError: (typeof error.response.data.password !== "undefined") ? error.response.data.password : "" })
                
                
            }).catch (error => {
            console.log("Server down")
        })
    }

    render() {
        return (<div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">&nbsp;TruYum</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav>
            </Navbar>

            <h2>Login</h2>
            
            <Container>
                <Form>
                    <Row>
                        <Form.Group sm={4} as={Col}>
                            <Form.Label>User Id</Form.Label>
                            <Form.Control type="text" id="userId" />
                            <Alert variant="danger" show={this.state.useridError !== ""}>{this.state.useridError}</Alert>
                        </Form.Group>

                        <Form.Group sm={4} as={Col}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="password" />
                            <Alert variant="danger" show={this.state.passwordError !== ""}>{this.state.passwordError}</Alert>
                        </Form.Group>

                    </Row>
                    <Button mt={3} onClick={this.handleSubmit.bind(this)}>Login</Button>
                </Form>

                <Alert variant="danger" show={this.state.invalidError !== ""}>{this.state.invalidError}</Alert>

            </Container>
            
        </div>)
    }
}

export default Signin;