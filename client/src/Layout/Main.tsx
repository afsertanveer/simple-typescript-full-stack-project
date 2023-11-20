import React, { useEffect, useState } from "react";
import { user } from "../models/user";
import NavBar from "../components/NavBar";
import SignUpModal from "../components/SignUpModal";
import LoginModal from "../components/LoginModal";
import * as NotesApi from "../network/notes_api";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Main = () => {
  const [loggedInUser, setLoggedInUser] = useState<user | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);
  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);
  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => {
          setShowLogInModal(true);
        }}
        onSignUpClicked={() => {
          setShowSignUpModal(true);
        }}
        onLogoutSuccessfull={() => {
          setLoggedInUser(null);
        }}
      />
      <Container>
        <Outlet></Outlet>
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => {
            setShowSignUpModal(false);
          }}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLogInModal && (
        <LoginModal
          onDismiss={() => {
            setShowLogInModal(false);
          }}
          onLoginSuccessfull={(user) => {
            setLoggedInUser(user);
            setShowLogInModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Main;
