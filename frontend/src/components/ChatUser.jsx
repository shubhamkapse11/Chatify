import React from "react";
import { useAuth } from "../context/useAuth";
import useConversation from "../states-manager/useConversation";
const ChatUser = () => {
    const [authUser] = useAuth();
    // Correctly access name from the nested data structure
    const userName = authUser?.data?.userData?.name || "User";
    const { selectedConversation, setSelectedConversation } = useConversation();

    return (
        <div className="flex items-center gap-3 p-4 bg-slate-800 border-b border-slate-700">
            {/* Avatar */}
            <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center text-sm font-semibold text-white">
                {selectedConversation?.name.charAt(0).toUpperCase()}
            </div>
            {/* User Info */}
            <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-white leading-none">
                    {selectedConversation?.name}
                </h1>
                <span className="text-xs text-green-500 font-medium">Online</span>
            </div>
        </div>
    );
};

export default ChatUser;

