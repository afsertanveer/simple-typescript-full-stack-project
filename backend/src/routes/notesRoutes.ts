import express from "express";
import * as NoteController from './../controllers/notesController';

const router = express.Router()

router.get("/",NoteController.getNotes);
router.post('/',NoteController.createNote);
router.get('/:noteId',NoteController.getNote);
router.patch("/:noteId",NoteController.updateNote);
router.delete("/:noteId",NoteController.deleteNote);
export default router;