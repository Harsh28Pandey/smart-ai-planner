import Note from "../models/noteModel.js";

// GET NOTES
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json({ notes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE NOTE
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

// UPDATE NOTE
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

// DELETE NOTE
export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        await Note.findOneAndDelete({ _id: id, userId: req.userId });

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// AI ENHANCE (MOCK - replace with OpenAI/Gemini)
export const enhanceNote = async (req, res) => {
    try {
        const { text } = req.body;

        const enhancedText =
            "✨ AI Enhanced Version:\n\n" +
            text +
            "\n\n(Improved structure, clarity & key points highlighted)";

        res.json({ enhancedText });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// AI GENERATE NOTES FROM TOPIC (MOCK)
export const generateNotes = async (req, res) => {
    try {
        const { topic } = req.body;

        const content = `# ${topic}\n\n- Introduction\n- Key Concepts\n- Important Points\n- Summary`;

        res.json({ content });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// REVISION SHEET
export const revisionSheet = async (req, res) => {
    try {
        const { text } = req.body;

        const revision = `📚 Revision Sheet:\n\n${text}\n\n✔ Key points summarized`;

        res.json({ revision });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};