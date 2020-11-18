import React from 'react';
import axios from 'axios';
import moment from "moment";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, Table } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

toast.configure();

class Menuitemsuser extends React.Component {

    state = {
        menuitems: [],
        cartitems: [],
        loggedin: false
    }

    componentWillMount() {

        const cookies = new Cookies();

        if (String(cookies.get('token')) === 'undefined') {
            this.props.history.push("/signin")
            toast("Session Expired. Login again", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
        }

        else {

            axios.get(`http://localhost:8765/menuitem-service/user/menuitems`, {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')
                }
            }).then(res => {
                this.setState({ menuitems: res.data })
                this.setState({ loggedin: true })
            })

            axios.get(`http://localhost:8765/menuitem-service/user/cart/` + localStorage.getItem('userId'), {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')
                }
            }).then(res => {
                this.setState({ cartitems: res.data })
            })
        }
    }


    add(msg) {
        const cookies = new Cookies();

        const data = {
            menuItemId: Number(msg.menuItemId),
            userId: localStorage.getItem('userId')
        }
        axios.post("http://localhost:8765/menuitem-service/user/addtocart", data, {
            headers: {
                Authorization: 'Bearer ' + cookies.get('token')
            }
        })
            .then(res => {
                this.componentWillMount();
                toast("Added to cart", { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER })
            })
    }

    remove(msg) {
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
        
        var cart_id = false
        this.state.cartitems.forEach(element => {
            if (element.id === menuItemId) {
                cart_id=true
            }
        })
        
        return (
            <tr key={menuItemId}>
                <td>{menuitem.name}</td>

                <td>{menuitem.price}</td>
                <td>{moment(menuitem.dateOfLaunch).format("D MMM YYYY")}</td>
                <td>{menuitem.category}</td>
                <td>{menuitem.freeDelivery ? <Icon style={{ color: "green" }}>check_circle</Icon> : <Icon color="secondary">cancel</Icon>}</td>
                <td>{
                    cart_id?
                        <Button onClick={() => this.remove({ menuItemId })}>Remove from cart</Button> :
                        <Button onClick={() => this.add({ menuItemId })}>Add to cart</Button>

                }
                </td>
            </tr>)
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

            {this.state.loggedin ?
                <div>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

                    <h2>Menu Items</h2>


                    {(this.state.menuitems.length) > 0 ?
                        <Container>
                            <Table striped bordered hover variant="dark">
                                <thead>

                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Date of launch</th>
                                        <th>Category</th>
                                        <th >Free delivery</th>
                                        <th width={'10%'}></th>

                                    </tr>

                                </thead>

                                <tbody>
                                    {this.state.menuitems.map(menuitem => this.rowCreator({ menuitem }))}
                                </tbody>

                            </Table>
                        </Container>

                        : <h3>Empty Menu item list</h3>}

                    <Button href={"cart/" + localStorage.getItem('userId')}>Cart</Button>
                </div>
                : <div>Unauthorised</div>}
        </div>)
    }

}


export default Menuitemsuser;