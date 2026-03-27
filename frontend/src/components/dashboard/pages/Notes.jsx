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
            setShowForm(false);
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

    // ================= PIN / UNPIN =================
    const handleTogglePin = async (note) => {
        try {
            const res = await axiosInstance.put(
                `/api/notes/update-note/${note._id}`,
                { pinned: !note.pinned },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setNotes(prev =>
                prev.map(n => (n._id === note._id ? res.data.note : n))
            );

            if (selectedNote?._id === note._id) {
                setSelectedNote(res.data.note);
            }

        } catch (err) {
            console.log(err);
        }
    };

    // ================= SEARCH =================
    const filteredNotes = (notes || [])
        .filter(n =>
            n?.title?.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => b.pinned - a.pinned); // pinned on top

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
                        className="px-4 py-2 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-blue-400"
                    />

                    {/* ➕ BUTTON */}
                    <button onClick={() => setShowForm(true)}
                        className="group relative flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 active:scale-95 overflow-hidden before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 cursor-pointer">
                        <span className="text-xl transition-transform duration-300 group-hover:rotate-90">➕</span>
                        Create Note
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
                        className="group relative flex items-center gap-2 px-5 py-2 rounded-2xl text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/10 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95 overflow-hidden cursor-pointer"
                    >
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                        Back
                    </button>

                    {/* TITLE BLOCK */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                        <p className="text-xs text-gray-400 mb-2">Title</p>

                        <div className="flex justify-between items-center">
                            {editingId === selectedNote._id ? (
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-blue-400"
                                />
                            ) : (
                                <h2 className="text-2xl font-semibold">
                                    {selectedNote.title}
                                </h2>
                            )}

                            {/* PIN BUTTON on hover */}
                            <button
                                onClick={() => handleTogglePin(selectedNote)}
                                className={`text-xl ml-3 opacity-0 group-hover:opacity-100 ${selectedNote.pinned ? "text-yellow-400" : "text-gray-400"} hover:scale-110 transition`}
                            >
                                {selectedNote.pinned ? "Unpin" : "Pin"}
                            </button>
                        </div>
                    </div>

                    {/* DESCRIPTION BLOCK */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                        <p className="text-xs text-gray-400 mb-2">Description</p>

                        {editingId === selectedNote._id ? (
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-3 h-32 rounded-2xl bg-white/10 border border-white/20 outline-none focus:border-blue-400"
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
                                    className="px-4 py-2 bg-blue-600 rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition"
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() => setEditingId(null)}
                                    className="px-4 py-2 bg-gray-500 rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleEdit(selectedNote)}
                                    className="px-4 py-2 bg-yellow-400 text-black rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(selectedNote._id, selectedNote.title)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition"
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
                    <div className="col-span-3 grid grid-cols-3 gap-6">
                        {filteredNotes.map(note => (
                            <div
                                key={note._id}
                                className="relative group p-5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:-translate-y-1 hover:scale-[1.03] transition"
                            >
                                {/* PIN BUTTON */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleTogglePin(note);
                                    }}
                                    className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${note.pinned ? "bg-yellow-400 text-black" : "bg-gray-500 text-white"} hover:scale-110 shadow-md cursor-pointer`}
                                >
                                    {note.pinned ? "Unpin" : "Pin"}
                                </button>

                                <div onClick={() => setSelectedNote(note)}>
                                    <h3 className="font-semibold">{note.title}</h3>
                                    <p className="text-sm text-gray-300 line-clamp-2">
                                        {note.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FORM */}
                    {showForm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">

                            {/* FORM CARD */}
                            <div className="relative w-full max-w-lg p-6 mb-45 rounded-3xl bg-gray-800 border shadow-2xl animate-[fadeIn_.3s_ease]">

                                {/* HEADER */}
                                <div className="flex justify-between items-center mb-5">
                                    <h2 className="text-lg font-semibold text-white">
                                        {editingId ? "Update Note" : "Create Note"}
                                    </h2>

                                    <button
                                        onClick={() => setShowForm(false)}
                                        className="text-gray-400 hover:text-white transition hover:rotate-90 duration-300 cursor-pointer"
                                    >
                                        ✖
                                    </button>
                                </div>

                                {/* INPUT */}
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title..."
                                    className="w-full p-3 mb-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition"
                                />

                                {/* TEXTAREA */}
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Write your note..."
                                    className="w-full p-3 mb-5 h-32 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition resize-none"
                                />

                                {/* ACTION BUTTON */}
                                <button
                                    onClick={handleSave}
                                    className="w-full py-3 rounded-xl text-white font-medium bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                >
                                    {editingId ? "Update Note" : "Save Note"}
                                </button>

                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default Notes;