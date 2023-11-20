import React from 'react';
import { Container } from 'react-bootstrap';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import { user } from '../models/user';
import styles from "../styles/NotesPage.module.css";


interface NotesPageProps{
    loggedInUser:user|null
}
const NotesPage = ({loggedInUser}:NotesPageProps) => {
  console.log("asdada",loggedInUser);
  
    return (
        <>
         <Container className={styles.notesPage}>
        <>
        {
          loggedInUser ?
          <NotesPageLoggedInView/> : <NotesPageLoggedOutView/>
        }
        </>
      </Container>
        </>
    );
};

export default NotesPage;