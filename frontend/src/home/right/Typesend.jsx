import React, { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "../../components/ui/input";
import useSendMsg from "../../context/useSendMsg";

const Typesend = () => {
    const { sendMessages, loading } = useSendMsg();
    const [message, setMessage] = useState('');
    return (
        <div className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="flex items-center gap-2 max-w-4xl mx-auto">
                <Input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="flex items-center justify-center h-9 w-9 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all active:scale-95"
                    onClick={() => {
                        if (message.trim()) {
                            sendMessages(message);
                            setMessage('');
                        }
                    }}>
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default Typesend;

