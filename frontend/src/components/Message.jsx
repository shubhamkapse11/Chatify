import React, { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import useGetMessages from "../context/useGetMessages";
import { useAuth } from "../context/useAuth";
import useGetSocketMsg from "../context/useGetSocketMsg";
import { Skeleton } from "./ui/Skeleton";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    const [authUser] = useAuth();
    useGetSocketMsg();  // Enable real-time message updates

    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "flex flex-col max-w-[70%]",
                            idx % 2 === 0 ? "ml-auto items-end" : "mr-auto items-start"
                        )}
                    >
                        <Skeleton className={cn(
                            "h-10 w-40 rounded-2xl",
                            idx % 2 === 0 ? "rounded-br-none" : "rounded-bl-none"
                        )} />
                    </div>
                ))}
            </div>
        )
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
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
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                    </span>
                </div>
            ))}
            <div ref={lastMessageRef} />
        </div>
    );
};
/* eslint-disable react-hooks/exhaustive-deps */
export default Messages;
