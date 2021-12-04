import React from 'react';
import { Container, Navbar } from 'react-bootstrap'

const NavBar = () => {
    return (
        <div>
            <>
                <Navbar expand="lg" variant="dark" bg="primary">
                    <Container>
                    <Navbar.Brand href="#">Date Picker</Navbar.Brand>
                    </Container>
                </Navbar>
            </>
        </div>
    )
}

export default NavBar
