import React, { useEffect, useState } from "react";
import {Container,Row} from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
        setNotes(notes);
        console.log("asdsad")
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);
  return <Container>
    <Row xs={1} md={2} xl={3} className="g-4">
    {notes.length>0 && notes.map(note=><Note key={note._id} className={styles.note} note={note}></Note>)}

    </Row>
  </Container>;
}

export default App;
