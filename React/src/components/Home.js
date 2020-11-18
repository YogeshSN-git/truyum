import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar} from 'react-bootstrap';

class Home extends React.Component {


  render() {
    return (<div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">&nbsp;TruYum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
      <Button href="/signin">Login</Button>
      <Button href="/signup">Sign Up</Button>
    </div>
    )
  }
}

export default Home;