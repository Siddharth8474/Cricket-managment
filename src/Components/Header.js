import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="Addplayer">
                <Link to={"Addplayer"}>Addplayer</Link>
            </Nav.Link>
            <Nav.Link href="Playerlist">
               <Link to={"playerlist"}>Playerlist</Link>
            </Nav.Link>
            <Nav.Link href="Addteam">
               <Link to={"Addteam"}>Addteam</Link>
            </Nav.Link>

            <Nav.Link href="teamlist">
               <Link to={"Teamlist"}>Teamlist</Link>
            </Nav.Link>
            {/* <Nav.Link href="Editplayer">
            <Link to={"Editplayer"}>Editplayer</Link>
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header