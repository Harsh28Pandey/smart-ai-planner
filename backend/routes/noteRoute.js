import express from "express";
import { getNotes, createNote, updateNote, deleteNote, enhanceNote, generateNotes, revisionSheet } from "../controllers/noteController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const router = express.Router();

router.get("/get-notes", isAuthenticated, getNotes);
router.post("/create", isAuthenticated, createNote);
router.put("/update-note/:id", isAuthenticated, updateNote);
router.delete("/delete-note/:id", isAuthenticated, deleteNote);

// AI routes
router.post("/ai/enhance", isAuthenticated, enhanceNote);
router.post("/ai/generate-notes", isAuthenticated, generateNotes);
router.post("/ai/revision", isAuthenticated, revisionSheet);

export default router;