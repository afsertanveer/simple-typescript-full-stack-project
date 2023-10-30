import express from "express";
import * as NoteController from './../controllers/notesController';

const router = express.Router()

router.get("/",NoteController.getNotes);
router.post('/',NoteController.createNote);
router.get('/:noteId',NoteController.getNote);
export default router;