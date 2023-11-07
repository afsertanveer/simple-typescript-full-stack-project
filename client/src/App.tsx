import React, { useEffect, useState } from "react";
import {Button, Container,Row} from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';
import styleUtils from './styles/utils.module.css';
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";
function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog,setShowAddNoteDialog] = useState(false);
  async function deleteNote(note:NoteModel){
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote=>existingNote._id!==note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNote();        
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);
  return <Container>
    <Button onClick={()=>setShowAddNoteDialog(true)} className={`my-4 ${styleUtils.blockCenter}`}>Add new Note</Button>
    <Row xs={1} md={2} xl={3} className="g-4">
    {notes.length>0 && notes.map(note=><Note onDeleteNoteClicked={deleteNote} key={note._id} className={styles.note} note={note}></Note>)}

    </Row>
    {
      showAddNoteDialog && <AddNoteDialog onDismiss={()=>setShowAddNoteDialog(false)} onNoteSaved={(newNote)=>{ 
        setNotes([...notes,newNote]);
        setShowAddNoteDialog(false)}}/>
    }
  </Container>;
}

export default App;
