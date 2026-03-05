import React, { useState, useRef } from "react";
import { Bot, Send, Mic, Trash2 } from "lucide-react";

const prompts = [
    "Create a DSA study plan",
    "Explain Binary Search",
    "Give React interview questions",
    "Make a 7 day coding schedule"
];

const AIAssistant = () => {

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [listening, setListening] = useState(false);
    const [typing, setTyping] = useState(false);   // ⭐ typing state

    const recognitionRef = useRef(null);

    const sendMessage = () => {

        if (!message.trim()) return;

        const userMessage = { role: "user", text: message };

        setChat(prev => [...prev, userMessage]);

        setMessage("");

        // show typing
        setTyping(true);

        setTimeout(() => {

            const aiMessage = {
                role: "ai",
                text: "AI response will appear here."
            };

            setChat(prev => [...prev, aiMessage]);
            setTyping(false);

        }, 1200); // typing delay
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    const startVoice = () => {

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech Recognition not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setMessage((prev) => prev + " " + transcript);
        };

        recognition.start();
        recognitionRef.current = recognition;
    };

    const clearChat = () => {
        setChat([]);
    };

    return (
        <div className="flex flex-col h-120">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">
                    <Bot className="text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">
                        AI Assistant
                    </h2>
                </div>

                <button
                    onClick={clearChat}
                    className="cursor-pointer flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-red-500 border border-red-600 text-white hover:bg-red-600 transition"
                >
                    <Trash2 size={16} />
                    Clear Chat
                </button>

            </div>

            {/* Chat Area */}
            <div className="flex-1 relative overflow-y-auto">

                {chat.length === 0 && (

                    <div className="absolute inset-0 flex items-center justify-center">

                        <div className="flex flex-col items-center gap-5 text-center max-w-md">

                            <p className="text-slate-400 text-sm">
                                Ask anything about your studies, AI will help you.
                            </p>

                            <div className="flex flex-wrap justify-center gap-3">

                                {prompts.map((prompt, index) => (

                                    <button
                                        key={index}
                                        onClick={() => setMessage(prompt)}
                                        className="cursor-pointer px-4 py-2 text-sm rounded-full 
                                        bg-purple-500/10 border border-purple-400/20 
                                        text-purple-200 hover:bg-purple-600 transition"
                                    >
                                        {prompt}
                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                )}

                <div className="space-y-4">

                    {chat.map((msg, index) => (

                        <div
                            key={index}
                            className={`p-3 rounded-xl max-w-[70%] text-sm 
                            ${msg.role === "user"
                                    ? "ml-auto bg-purple-600 text-white"
                                    : "bg-white/10 text-slate-300"
                                }`}
                        >
                            {msg.text}
                        </div>

                    ))}

                    {/* ⭐ AI Typing */}
                    {typing && (
                        <div className="p-3 rounded-xl max-w-[70%] text-sm bg-white/10 text-slate-300 animate-pulse">
                            AI is typing...
                        </div>
                    )}

                </div>

            </div>

            {/* Input */}
            <div className="flex gap-2 mt-4">

                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask AI something..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-purple-500"
                />

                <button
                    onClick={startVoice}
                    className={`cursor-pointer px-3 py-3 rounded-xl border border-white/10 
                    ${listening ? "bg-red-500" : "bg-white/5 hover:bg-white/10"}`}
                >
                    <Mic size={18} />
                </button>

                <button
                    onClick={sendMessage}
                    className="cursor-pointer px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
                >
                    <Send size={18} />
                </button>

            </div>

        </div>
    );
};

export default AIAssistant;