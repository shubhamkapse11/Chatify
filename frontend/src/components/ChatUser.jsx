import React from "react";

const ChatUser = () => {
    return (
        <div className="flex items-center gap-3 p-4 bg-slate-800 border-b border-slate-700">
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center text-sm font-semibold text-white">
                AJ
            </div>
            {/* User Info */}
            <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-white leading-none">Alice Johnson</h1>
                <span className="text-xs text-green-500 font-medium">Online</span>
            </div>
        </div>
    );
};

export default ChatUser;

