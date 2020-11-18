import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Nav, Navbar, Alert, Row, Col, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

toast.configure();

class Signup extends React.Component {

    state = {
        nameError: '',
        useridError: '',
        passwordError: '',
        roleError: '',

        userIdExistError: ''
    }

    handleSubmit(event) {

        event.preventDefault();

        const data = {

            name: document.getElementById("name").value,
            userId: document.getElementById("userId").value,
            password: document.getElementById("password").value,
            role:(document.getElementById("role").value !=="null") ? [document.getElementById("role").value]:null

        }

        axios.post("http://localhost:8765/menuitem-service/auth/signup", data)

            .then(res => {
                this.props.history.push("/signin")
                toast("Registered successfully", { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER })
            })

            .catch(error => {
                console.log(error.response)

                this.setState({ nameError: (typeof error.response.data.name !== "undefined") ? error.response.data.name : "" })
                this.setState({ passwordError: (typeof error.response.data.password !== "undefined") ? error.response.data.password : "" })
                this.setState({ useridError: (typeof error.response.data.userId !== "undefined") ? error.response.data.userId : "" })
                this.setState({ roleError: (typeof error.response.data.role !== "undefined") ? error.response.data.role : "" })

                this.setState({ userIdExistError: (typeof error.response.data.message !== "undefined") ? error.response.data.message : "" })
            }).catch(error => {
                console.log("server down")
            })
    }

    render() {
        return (<div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">&nbsp;TruYum</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link href="/signin">Login</Nav.Link>
                </Nav>
            </Navbar>
            <h2>Sign Up</h2>


            <Container>
                <Form>

                    <Row>
                        Name
                        <Form.Group sm={2} as={Col}>
                            <Form.Control type="text" id="name" />
                            <Alert variant="danger" show={this.state.nameError !== ""}>{this.state.nameError}</Alert>
                        </Form.Group>

                            UserId
                        <Form.Group sm={2} as={Col}>
                            <Form.Control type="text" id="userId"  />
                            <Alert variant="danger" show={this.state.useridError !== ""}>{this.state.useridError}</Alert>
                        </Form.Group>

                            Password
                        <Form.Group sm={2} as={Col}>
                            <Form.Control type="password" id="password" />
                            <Alert variant="danger" show={this.state.passwordError !== ""}>{this.state.passwordError}</Alert>
                        </Form.Group>
                            Role:
                        <Form.Group sm={2} as={Col}  >

                        <Form.Control as="select"  id="role" custom>
                            <option value="null"  hidden>Select Role</option>
                            <option value="user" >User</option>
                            <option value="admin">Admin</option>
                        </Form.Control>&nbsp;
                        <Alert variant="danger" show={this.state.roleError !== ""}>{this.state.roleError}</Alert>
                        </Form.Group>

                    </Row>

                </Form>

            </Container>




                {/* Name: <input type="text" name="name" onChange={(event => this.name = event.target.value)} required="required" /> &nbsp;
                UserId: <input type="text" name="userid" onChange={(event => this.userId = event.target.value)} required="required" />&nbsp;
                Password: <input type="password" name="password" onChange={(event => this.password = event.target.value)} />&nbsp; */}


                <Button onClick={this.handleSubmit.bind(this)}>Add</Button>

                <Alert variant="danger" show={this.state.userIdExistError !== ""}>{this.state.userIdExistError}</Alert>

        </div>)
    }
}

export default Signup;