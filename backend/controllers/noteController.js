import Note from "../models/noteModel.js";

/**
 * @route createNote
 * @description to create a note (only logged in user to create a note)
 * @access Private
*/
export const createNote = async (req, res) => {
    try {
        const { title, description, pinned = false } = req.body;

        const note = await Note.create({
            userId: req.userId,
            title,
            description,
            pinned
        });

        res.json({ note });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @route getNotes
 * @description to get all the notes created on particular id (means logged in user only get notes)
 * @access Private
*/
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json({ notes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @route updateNote
 * @description to update a note on particular id (means logged in user only update note)
 * @access Private
*/
export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findOneAndUpdate(
            { _id: id, userId: req.userId },
            req.body,
            { new: true }
        );

        res.json({ note });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @route deleteNote
 * @description to delete a note on particular id (means only logged in user to delete a note)\
 * @access Private
*/
export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        await Note.findOneAndDelete({ _id: id, userId: req.userId });

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};