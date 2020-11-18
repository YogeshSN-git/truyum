import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Nav, Navbar, Alert, Row, Col, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

class Addmenuitem extends React.Component {

    state = {
        nameError: '',
        priceError: '',
        dateError: '',
        categoryError: ''
    }

    componentDidMount() {
        const cookies = new Cookies();
        if (String(cookies.get('token')) === 'undefined') {
            this.props.history.push("/signin")
            toast("Session Expired. Login again", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })

        }
    }


    handleSubmit(event) {

        event.preventDefault();
        const cookies = new Cookies();

        const data = {
            name: this.name,
            price: this.price,
            active: this.active,
            dateOfLaunch: this.dateOfLaunch,
            category: this.category,
            freeDelivery: this.freeDelivery
        }
        axios.post("http://localhost:8765/menuitem-service/admin/addmenuitem", data, {
            headers: {
                Authorization: 'Bearer ' + cookies.get('token')//the token is a variable which holds the token
            }
        })
            .then(res => {
                this.props.history.push("/menuitemsadmin")
                toast("Menu item added successfully", { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER })
            }).catch(error => {
                console.log(error.response.data)
                this.setState({ nameError: (typeof error.response.data.name !== "undefined") ? error.response.data.name : "" })
                this.setState({ priceError: (typeof error.response.data.price !== "undefined") ? error.response.data.price : "" })
                this.setState({ categoryError: (typeof error.response.data.category !== "undefined") ? error.response.data.category : "" })
                this.setState({ dateError: (typeof error.response.data.dateOfLaunch !== "undefined") ? error.response.data.dateOfLaunch : "" })
            })
    }


    render() {
        return (<div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">&nbsp;TruYum</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link href="/signin">Logout</Nav.Link>
                </Nav>
            </Navbar>

            <h2>Add Menu Item</h2>
            <Container>
                <Form>

                    <Row>
                        Name
                        <Form.Group sm={2} as={Col}>
                            <Form.Control type="text" name="name" onChange={(event => this.name = event.target.value)} />
                            <Alert variant="danger" sm={6} show={this.state.nameError !== ""}>{this.state.nameError}</Alert>
                        </Form.Group>

                            Price
                        <Form.Group sm={2} as={Col}>
                            <Form.Control type="text" name="price" onChange={(event => this.price = event.target.value)} />
                            <Alert variant="danger" sm={6} show={this.state.priceError !== ""}>{this.state.priceError}</Alert>
                        </Form.Group>

                            Category
                        <Form.Group sm={2} as={Col}>
                            <Form.Control type="text" name="category" onChange={(event => this.category = event.target.value)} />
                            <Alert variant="danger" sm={6} show={this.state.categoryError !== ""}>{this.state.categoryError}</Alert>
                        </Form.Group>

                        Date of launch
                        <Form.Group sm={2} as={Col}>
                            <input type="date" name="dateOfLaunch" onChange={(event => this.dateOfLaunch = event.target.value)} required="required" />
                            <Alert variant="danger" sm={6} show={this.state.dateError !== ""}>{this.state.dateError}</Alert>
                        </Form.Group>
                    </Row>

                    <Row>
                        Active
                        <Form.Group sm={1} as={Col}>
                            <Form.Check type="checkbox" name="Active" onChange={(event => this.active = true)} />
                        </Form.Group>

                            Free delivery
                            <Form.Group sm={1} as={Col}>
                            <Form.Check type="checkbox" name="freeDelivery" onChange={(event => this.freeDelivery = true)} />
                        </Form.Group>

                    </Row>
                    <Button onClick={this.handleSubmit.bind(this)}>Add</Button>





                    {/* Name: <input type="text" name="name" onChange={(event => this.name = event.target.value)} required="required" /> */}
                    {/* Price: <input type="text" name="price" onChange={(event => this.price = event.target.value)} required="required" />
                    <Alert variant="danger" sm={6} show={this.state.priceError !== ""}>{this.state.priceError}</Alert> */}
                    {/* Active: <input type="checkbox" name="active" onChange={(event => this.active = true)} />
                Date of launch: <input type="date" name="dateOfLaunch" onChange={(event => this.dateOfLaunch = event.target.value)} required="required" />

                Category: <input type="text" name="category" onChange={(event => this.category = event.target.value)} required="required" />
                    <Alert variant="danger" sm={6} show={this.state.categoryError !== ""}>{this.state.categoryError}</Alert>
                Free delivery: <input type="checkbox" name="freeDelivery" onChange={(event => this.freeDelivery = true)} /> */}
                </Form>
            </Container>
            <Button href={'/menuitemsadmin'}>Go to Menu</Button>

        </div>)
    }
}

export default Addmenuitem;