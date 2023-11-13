import React from 'react';
import { user } from '../models/user';
import { Container, Navbar } from 'react-bootstrap';


interface NavBarProps{
    loggedInUser:user|null,
    onSignUpClicked:()=>void,
    onLoginClicked:()=>void,
    onLogoutSuccessfull:()=>void,
}

const NavBar = ({loggedInUser,onSignUpClicked,onLoginClicked,onLogoutSuccessfull}:NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand>
                    Cool Notes App
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavBar;