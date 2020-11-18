import React from 'react';
import axios from 'axios';
import moment from "moment";
import Cookies from 'universal-cookie';
import Icon from '@material-ui/core/Icon';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Table } from 'react-bootstrap';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

class Cart extends React.Component {
    state = {
        menuitems: []

    }
    componentWillMount() {
        const cookies = new Cookies();
        if (String(cookies.get('token')) === 'undefined') {
            this.props.history.push("/signin")
            toast("Session Expired. Login again", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
        }
        else {
            this.total = 0
            axios.get(`http://localhost:8765/menuitem-service/user/cart/` + this.props.match.params.userid, {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')
                }
            }).then(res => {
                this.setState({ menuitems: res.data })
            })
        }
    }
    handleClick(msg) {
        const cookies = new Cookies();

        const data = {
            menuItemId: Number(msg.menuItemId),
            userId: localStorage.getItem('userId')
        }
        axios.post("http://localhost:8765/menuitem-service/user/removefromcart", data, {
            headers: {
                Authorization: 'Bearer ' + cookies.get('token')
            }
        })
            .then(res => {
                this.componentWillMount();
                toast("Removed from cart", { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER })
            })
    }


    rowCreator(menu_item) {
        var menuitem = menu_item.menuitem
        var menuItemId = menuitem.id;
        this.total = this.total + menuitem.price
        return (
            <tr key={menuItemId}>
                <td>{menuitem.name}</td>
                <td>{menuitem.price}</td>
                <td>{moment(menuitem.dateOfLaunch).format("D MMM YYYY")}</td>
                <td>{menuitem.category}</td>
                <td>{menuitem.freeDelivery ? <Icon style={{ color: "green" }}>check_circle</Icon> : <Icon color="secondary">cancel</Icon>}</td>
                <td>
                    <Button onClick={() => this.handleClick({ menuItemId })}>Delete</Button>
                </td>
            </tr>)
    }



    render() {
        return (<div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">&nbsp;TruYum</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link href="/signin">Logout</Nav.Link>
                </Nav>
            </Navbar>

            <h2>Cart</h2>
            {(this.state.menuitems.length) > 0 ?
                <Container>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Date of launch</th>
                                <th>Category</th>
                                <th>Free delivery</th>
                                <th></th>
                            </tr>

                        </thead>
                        <tbody>
                            {this.state.menuitems.map(menuitem => this.rowCreator({ menuitem }))}
                        </tbody>
                    </Table>
                   Total {this.total}
                </Container>
                : <h3>Empty Cart list</h3>}
            <Button href={'/menuitemsuser'}>Go to Menu</Button>

        </div>)
    }
}


export default Cart;