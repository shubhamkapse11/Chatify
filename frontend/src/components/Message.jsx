import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import useGetMessages from "../context/useGetMessages";
import { useAuth } from "../context/useAuth";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    const [authUser] = useAuth();
    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                <div className="flex items-center justify-center h-full text-slate-500">
                    <span>Loading messages...</span>
                </div>
            </div>
        )
    }

    if (!messages || messages.length === 0) {
        return (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                <div className="flex items-center justify-center h-full text-slate-500">
                    <span>No messages found</span>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((msg) => (
                <div
                    key={msg._id}
                    className={cn(
                        "flex flex-col max-w-[70%]",
                        msg.sender === authUser?.data?.userData?._id ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                >
                    <div
                        className={cn(
                            "px-4 py-2 rounded-2xl text-sm",
                            msg.sender === authUser?.data?.userData?._id
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-slate-800 text-slate-200 rounded-bl-none"
                        )}
                    >
                        {msg.message}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Messages;
