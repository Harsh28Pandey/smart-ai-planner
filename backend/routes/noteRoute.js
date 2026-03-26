import express from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controllers/noteController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const router = express.Router();

/** 
 ** POST /api/notes/create
 ** To create a new note
*/
router.post("/create", isAuthenticated, createNote);

/**
 ** GET /api/notes/get-notes
 ** To get all the notes here created on a particular id
*/
router.get("/get-notes", isAuthenticated, getNotes);

/**
 ** PUT /api/notes/update-note/:id
 ** To update a note on particular id
*/
router.put("/update-note/:id", isAuthenticated, updateNote);

/**
 ** DELETE /api/notes/delete-note?:id
 ** To delete a note on a particular id
*/
router.delete("/delete-note/:id", isAuthenticated, deleteNote);

export default router;