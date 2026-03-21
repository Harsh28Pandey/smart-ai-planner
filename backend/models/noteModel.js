import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title: String,
        description: String,
        pinned: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;