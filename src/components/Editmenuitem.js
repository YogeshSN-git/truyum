import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Nav, Navbar, Alert, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

class Editmenuitem extends React.Component {
    state = {
        menuitems: '',

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
        else {

            axios.get(`http://localhost:8765/menuitem-service/admin/menuitem/` + this.props.match.params.menuid, {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')//the token is a variable which holds the token
                }
            }).then(res => {
                this.setState({ menuitems: res.data })
            })
        }
    }

    handleSubmit(event) {

        event.preventDefault();
        const cookies = new Cookies();

        const data = {
            id: this.props.match.params.menuid,
            name: this.name,
            price: this.price,
            active: this.active,
            dateOfLaunch: this.dateOfLaunch,
            category: this.category,
            freeDelivery: this.freeDelivery
        }
        axios.post("http://localhost:8765/menuitem-service/admin/editmenuitem", data, {
            headers: {
                Authorization: 'Bearer ' + cookies.get('token')//the token is a variable which holds the token
            }
        })
            .then(res => {
                this.props.history.push("/menuitemsadmin")
                toast("Menu item Edited", { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER })
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

            <h2>Edit Menu Item</h2>
            <Container>
                <Form>

                    <Row>
                        Name
                        <Form.Group sm={2} as={Col}>
                            <Form.Control type="text" name="name" placeholder={this.state.menuitems.name} onChange={(event => this.name = event.target.value)} />
                            <Alert variant="danger" sm={6} show={this.state.nameError !== ""}>{this.state.nameError}</Alert>
                        </Form.Group>

                            Price
                        <Form.Group sm={2} as={Col}>
                            <Form.Control type="text" name="price" placeholder={this.state.menuitems.price} onChange={(event => this.price = event.target.value)} />
                            <Alert variant="danger" sm={6} show={this.state.priceError !== ""}>{this.state.priceError}</Alert>
                        </Form.Group>

                            Category
                        <Form.Group sm={2} as={Col}>
                            <Form.Control type="text" name="category" placeholder={this.state.menuitems.category} onChange={(event => this.category = event.target.value)} />
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

                </Form>
            </Container>

            <Button href={'/menuitemsadmin'}>Go to Menu</Button>

        </div>)
    }
}

export default Editmenuitem;