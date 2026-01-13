import React from "react";
import { cn } from "../lib/utils";

const Messages = () => {
    const messages = [
        { id: 1, text: "Hey! How's it going?", sender: "receiver", time: "10:00 AM" },
        { id: 2, text: "Not bad, just working on the chat app.", sender: "sender", time: "10:01 AM" },
        { id: 3, text: "That sounds cool! Is it using Shadcn/UI?", sender: "receiver", time: "10:02 AM" },
        { id: 4, text: "Yeah, for the layout and basic components.", sender: "sender", time: "10:05 AM" },
    ];

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={cn(
                        "flex flex-col max-w-[70%]",
                        msg.sender === "sender" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                >
                    <div
                        className={cn(
                            "px-4 py-2 rounded-2xl text-sm",
                            msg.sender === "sender"
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-slate-800 text-slate-200 rounded-bl-none"
                        )}
                    >
                        {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">
                        {msg.time}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Messages;
