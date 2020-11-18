import React from 'react';
import axios from 'axios';
import moment from "moment";
import Cookies from 'universal-cookie';
import Icon from '@material-ui/core/Icon';
import 'bootstrap/dist/css/bootstrap.min.css';CustomerRepository
import { Button, Nav, Navbar, Table, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

toast.configure();

class Menuitemsadmin extends React.Component {

    state = {
        menuitems: []
    }


    componentDidMount() {
        const cookies = new Cookies();

        if (String(cookies.get('token')) === 'undefined') {
            this.props.history.push("/signin")
            toast("Session Expired. Login again", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
        }

        else {
        
            axios.get(`http://localhost:8765/menuitem-service/admin/menuitems`, {
                headers: {
                    Authorization: 'Bearer ' + cookies.get('token')
                }
            })
                
                .then(res => {
                    this.setState({ menuitems: res.data })
                })
                
                .catch(error => {
                    console.log(error.response)
                    if (error.response.data.message === "Forbidden") {
                        this.props.history.push("/signin")
                        toast("Unauthorized entry. Login again", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
                    }
                })
        }
    }


    handleClick(menuItemId) {
        const cookies = new Cookies();

        axios.delete(`http://localhost:8765/menuitem-service/admin/deletemenuitem/` + Number(menuItemId.menuItemId), {
            headers: {
                Authorization: 'Bearer ' + cookies.get('token')
            }
        }).then(res => {
            this.componentDidMount();
            toast("Menu item deleted successfully", { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER })

        })

    }

    rowCreator(menu_item) {

        var menuitem = menu_item.menuitem
        var menuItemId = menuitem.id;
        return (
            <tr key={menuItemId}>
                <td>{menuitem.name}</td>
                <td>{menuitem.price}</td>
                <td>{menuitem.active ? <Icon style={{ color: "green" }}>check_circle</Icon> : <Icon color="secondary">cancel</Icon>}</td>
                <td>{moment(menuitem.dateOfLaunch).format("D MMM YYYY")}</td>
                <td>{menuitem.category}</td>
                <td>{menuitem.freeDelivery ? <Icon style={{ color: "green" }}>check_circle</Icon> : <Icon color="secondary">cancel</Icon>}</td>
                <td><Button href={'/editmenuitem/' + menuitem.id}>Edit MenuItem</Button>
                    <Button onClick={() => this.handleClick({ menuItemId })}>Delete MenuItem</Button></td>
            </tr>
        )
    }

    render() {

        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">&nbsp;TruYum</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="mr-auto">
                        <Nav.Link href="/signin">Logout</Nav.Link>
                    </Nav>
                </Navbar>

                <h2>Menu Items</h2>
                {(this.state.menuitems.length) > 0 ?
                    <Container >
                        <Table striped bordered hover variant="dark" >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Active</th>
                                    <th>Date of launch</th>
                                    <th>Category</th>
                                    <th>Free delivery</th>
                                    <th width={'23%'}></th>
                                </tr>

                            </thead>
                            <tbody >
                                {this.state.menuitems.map(menuitem => this.rowCreator({ menuitem }))}
                            </tbody>
                        </Table>
                    </Container>
                    : <h3>Empty Menu item list</h3>}
                <Button href={'/addmenuitem'}>Add MenuItem</Button>

            </div>)
    }
}


export default Menuitemsadmin;