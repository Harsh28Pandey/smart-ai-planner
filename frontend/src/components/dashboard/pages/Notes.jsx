import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance.js";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    const token = localStorage.getItem("token");

    // ================= FETCH =================
    const fetchNotes = async () => {
        try {
            const res = await axiosInstance.get("/api/notes/get-notes", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes(res.data.notes || []);
        } catch (err) {
            console.log(err);
            setNotes([]);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    // ================= SAVE =================
    const handleSave = async () => {
        if (!title || !description) return;

        try {
            if (editingId) {
                const res = await axiosInstance.put(
                    `/api/notes/update-note/${editingId}`,
                    { title, description },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setNotes(prev =>
                    prev.map(n => (n._id === editingId ? res.data.note : n))
                );

                // ✅ ADD THIS LINE
                setSelectedNote(res.data.note);

                setEditingId(null);
            } else {
                const res = await axiosInstance.post(
                    "/api/notes/create",
                    { title, description },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setNotes(prev => [res.data.note, ...prev]);

            }

            setTitle("");
            setDescription("");
            setShowForm(false); // 🔥 auto close form
        } catch (err) {
            console.log(err);
        }
    };

    // ================= DELETE =================
    const handleDelete = async (id, title) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${title}"?`
        );

        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/api/notes/delete-note/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setNotes(prev => prev.filter(n => n._id !== id));
            setSelectedNote(null);
        } catch (err) {
            console.log(err);
        }
    };

    // ================= EDIT =================
    const handleEdit = (note) => {
        setTitle(note.title);
        setDescription(note.description);
        setEditingId(note._id);
    };

    // ================= SEARCH =================
    const filteredNotes = (notes || []).filter(n =>
        n?.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen p-8 text-white">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8 backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-2xl">

                <h1 className="text-3xl font-semibold">✨ My Notes</h1>

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-4 py-2 rounded-2xl bg-white/10 border border-white/20 
                        outline-none focus:border-blue-400"
                    />

                    {/* ➕ BUTTON */}
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 bg-blue-600 rounded-2xl cursor-pointer 
                        hover:scale-110 active:scale-95 transition"
                    >
                        ➕
                    </button>
                </div>
            </div>

            {/* STATS */}
            <div className="flex gap-6 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    Total: {notes.length}
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    Pinned: {(notes || []).filter(n => n?.pinned).length}
                </div>
            </div>

            {/* SINGLE NOTE */}
            {selectedNote ? (
                <div className="max-w-3xl mx-auto space-y-6">

                    {/* BACK BUTTON */}
                    <button
                        onClick={() => setSelectedNote(null)}
                        className="px-4 py-1 bg-white/10 rounded-2xl cursor-pointer 
        hover:bg-white/20 active:scale-95 transition"
                    >
                        ← Back
                    </button>

                    {/* TITLE BLOCK */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                        <p className="text-xs text-gray-400 mb-2">Title</p>

                        {editingId === selectedNote._id ? (
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 rounded-2xl bg-white/10 border border-white/20 
                outline-none focus:border-blue-400"
                            />
                        ) : (
                            <h2 className="text-2xl font-semibold">
                                {selectedNote.title}
                            </h2>
                        )}
                    </div>

                    {/* DESCRIPTION BLOCK */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                        <p className="text-xs text-gray-400 mb-2">Description</p>

                        {editingId === selectedNote._id ? (
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 h-32 rounded-2xl bg-white/10 border border-white/20 
                outline-none focus:border-blue-400"
                            />
                        ) : (
                            <p className="text-gray-300 leading-relaxed">
                                {selectedNote.description}
                            </p>
                        )}
                    </div>

                    {/* TIME BLOCK */}
                    <div className="flex justify-between p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur text-sm text-gray-400">

                        <div>
                            <p className="text-xs mb-1">Created At</p>
                            <p>{new Date(selectedNote.createdAt).toLocaleString()}</p>
                        </div>

                        <div className="text-right">
                            <p className="text-xs mb-1">Updated At</p>
                            <p>{new Date(selectedNote.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* ACTION BLOCK */}
                    <div className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">

                        {editingId === selectedNote._id ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-600 rounded-2xl cursor-pointer 
                    hover:scale-105 active:scale-95 transition"
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => setEditingId(null)}
                                    className="px-4 py-2 bg-gray-500 rounded-2xl cursor-pointer 
                    hover:scale-105 active:scale-95 transition"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleEdit(selectedNote)}
                                    className="px-4 py-2 bg-yellow-400 text-black rounded-2xl cursor-pointer 
                    hover:scale-105 active:scale-95 transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(selectedNote._id, selectedNote.title)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-2xl cursor-pointer 
                    hover:scale-105 active:scale-95 transition"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-8">

                    {/* NOTES */}
                    <div className="col-span-2 grid grid-cols-2 gap-6">
                        {filteredNotes.map(note => (
                            <div
                                key={note._id}
                                onClick={() => setSelectedNote(note)}
                                className="p-5 rounded-2xl bg-white/5 border border-white/10 
                                cursor-pointer hover:scale-105 transition"
                            >
                                <h3 className="font-semibold">{note.title}</h3>
                                <p className="text-sm text-gray-300 line-clamp-2">
                                    {note.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* FORM */}
                    {showForm && (
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">

                            <div className="flex justify-between mb-4">
                                <h2>{editingId ? "Update" : "Create"}</h2>

                                <button
                                    onClick={() => setShowForm(false)}
                                    className="cursor-pointer"
                                >
                                    ✖
                                </button>
                            </div>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="w-full p-3 mb-4 rounded-2xl bg-white/10"
                            />

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="w-full p-3 mb-4 rounded-2xl bg-white/10"
                            />

                            <button
                                onClick={handleSave}
                                className="w-full py-2 bg-blue-600 rounded-2xl cursor-pointer 
                                hover:scale-105 active:scale-95 transition"
                            >
                                {editingId ? "Update" : "Save"}
                            </button>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default Notes;