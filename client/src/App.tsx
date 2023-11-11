import React, { useEffect, useState } from "react";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";
function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [notesLoading,setNotesLoading] = useState(true);
  const [showNotesLoadingError,setShowNotesLoadingError] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  const notesGrid = 
  <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
        {notes.length > 0 &&
          notes.map((note) => (
            <Note
              onNoteClicked={setNoteToEdit}
              onDeleteNoteClicked={deleteNote}
              key={note._id}
              className={styles.note}
              note={note}
            ></Note>
          ))}
      </Row>
	  ;
  useEffect(() => {
    async function loadNotes() {
      try {
		setShowNotesLoadingError(false);
		setNotesLoading(true);
        const notes = await NotesApi.fetchNote();
        setNotes(notes);
      } catch (error) {
        console.error(error);
		setShowNotesLoadingError(true);
        alert(error);
      }finally{
		setNotesLoading(false);
	  }
    }
    loadNotes();
  }, []);
  return (
    <Container className={styles.notesPage}>
      <Button
        onClick={() => setShowAddNoteDialog(true)}
        className={`my-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
      >
        <FaPlus /> Add new Note
      </Button>
      {
		notesLoading && <Spinner animation="border" variant="primray"></Spinner>
	  }
	  {
		showNotesLoadingError && <p>Something went wrong! Please Refresh the page!</p>
	  }
	  {
		!notesLoading && !showNotesLoadingError && <>
		{
			notes.length>0? notesGrid : <p>You don't have any note yet</p>
		}
		</>
	  }
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNoteToEdit(null);
            setNotes(
              notes.map((exstingNote) =>
                exstingNote._id === updatedNote._id ? updatedNote : exstingNote
              )
            );
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
