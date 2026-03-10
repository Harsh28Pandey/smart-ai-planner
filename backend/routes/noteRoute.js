import express from "express";
import Note from "../models/noteModel.js";

const router = express.Router();

// CREATE a note
router.post("/", async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ all notes
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE a note
router.put("/:id", async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a note
router.delete("/:id", async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;