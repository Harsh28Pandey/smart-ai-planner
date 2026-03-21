import React, { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const token = localStorage.getItem("token");

    // ================= FETCH NOTES =================
    // const fetchNotes = async () => {
    //     try {
    //         const res = await axios.get("/api/notes", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         setNotes(res.data.notes);
    //     } catch (err) {
    //         console.log("Error fetching notes:", err);
    //     }
    // };

    // useEffect(() => {
    //     fetchNotes();
    // }, []);

    // ================= CREATE / UPDATE NOTE =================
    const handleSave = async () => {
        if (!title || !description) return;

        setLoading(true);

        try {
            if (editingId) {
                // UPDATE NOTE
                const res = await axios.put(
                    `/api/notes/${editingId}`,
                    { title, description },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setNotes((prev) =>
                    prev.map((note) =>
                        note._id === editingId ? res.data.note : note
                    )
                );
                setEditingId(null);
            } else {
                // CREATE NOTE
                const res = await axios.post(
                    "/api/notes",
                    { title, description },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setNotes([res.data.note, ...notes]);
            }

            setTitle("");
            setDescription("");
        } catch (err) {
            console.log("Save error:", err);
        }

        setLoading(false);
    };

    // ================= DELETE NOTE =================
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setNotes(notes.filter((n) => n._id !== id));
        } catch (err) {
            console.log("Delete error:", err);
        }
    };

    // ================= EDIT NOTE =================
    const handleEdit = (note) => {
        setTitle(note.title);
        setDescription(note.description);
        setEditingId(note._id);
    };

    // ================= AI ENHANCE (HOOK) =================
    const handleAIEnhance = async () => {
        if (!description) return;

        try {
            setLoading(true);

            // 🔥 Replace this API with your AI backend (OpenAI / Gemini)
            const res = await axios.post(
                "/api/ai/enhance",
                { text: description },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setDescription(res.data.enhancedText);
        } catch (err) {
            console.log("AI enhance error:", err);
        }

        setLoading(false);
    };

    // ================= SEARCH =================
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 text-white">

            {/* ================= HEADER ================= */}
            <div className="flex items-center justify-between mb-6">

                <h1 className="text-4xl font-bold tracking-wide">
                    📝 My Notes
                </h1>

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Search notes..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    className="px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 outline-none focus:border-purple-500 transition"
                />
            </div>

            {/* ================= STATS BAR ================= */}
            <div className="grid grid-cols-3 gap-4 mb-6">

                <div className="bg-gray-900/60 p-4 rounded-2xl border border-gray-800">
                    <p className="text-gray-400">Total Notes</p>
                    <h2 className="text-2xl font-bold">{notes.length}</h2>
                </div>

                <div className="bg-gray-900/60 p-4 rounded-2xl border border-gray-800">
                    <p className="text-gray-400">Pinned</p>
                    <h2 className="text-2xl font-bold">
                        {notes.filter(n => n.pinned).length}
                    </h2>
                </div>

                <div className="bg-gray-900/60 p-4 rounded-2xl border border-gray-800">
                    <p className="text-gray-400">AI Enhanced</p>
                    <h2 className="text-2xl font-bold">✨ Smart</h2>
                </div>
            </div>

            {/* ================= INPUT CARD ================= */}
            <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-xl mb-8">

                <input
                    type="text"
                    placeholder="Enter title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 mb-4 rounded-2xl bg-gray-800 outline-none border border-gray-700 focus:border-purple-500 transition"
                />

                <textarea
                    placeholder="Write your note..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 h-32 rounded-2xl bg-gray-800 outline-none border border-gray-700 focus:border-purple-500 transition"
                />

                {/* BUTTONS */}
                <div className="flex gap-4 mt-5">

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-6 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 
                cursor-pointer transition transform hover:scale-105 active:scale-95"
                    >
                        {editingId ? "Update Note" : "Save Note"}
                    </button>

                    <button
                        onClick={handleAIEnhance}
                        className="px-6 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 
                cursor-pointer transition transform hover:scale-105 active:scale-95"
                    >
                        ✨ AI Enhance
                    </button>
                </div>
            </div>

            {/* ================= NOTES GRID ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {filteredNotes.map((note) => (
                    <div
                        key={note._id}
                        className="group bg-gray-900/60 border border-gray-800 p-5 rounded-2xl shadow-lg 
                transition-all duration-300 hover:scale-[1.03] hover:border-purple-600"
                    >

                        {/* PIN BADGE */}
                        {note.pinned && (
                            <div className="text-xs mb-2 text-yellow-400">
                                📌 Pinned
                            </div>
                        )}

                        {/* TITLE */}
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition">
                            {note.title}
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="text-gray-300 mb-4 line-clamp-3">
                            {note.description}
                        </p>

                        {/* TAGS (UI ONLY) */}
                        <div className="flex gap-2 mb-4">
                            <span className="text-xs px-2 py-1 bg-purple-700 rounded-xl">
                                AI
                            </span>
                            <span className="text-xs px-2 py-1 bg-blue-700 rounded-xl">
                                Study
                            </span>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-between">

                            <button
                                onClick={() => handleEdit(note)}
                                className="px-4 py-1 rounded-2xl bg-yellow-500 text-black 
                        cursor-pointer hover:scale-105 transition"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(note._id)}
                                className="px-4 py-1 rounded-2xl bg-red-600 
                        cursor-pointer hover:scale-105 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;