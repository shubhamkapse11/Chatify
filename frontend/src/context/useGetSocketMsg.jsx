import React, { useContext, useEffect } from "react";
import { useSocketContext } from "./socketContext";
import useConversation from "../states-manager/useConversation";

function useGetSocketMsg() {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (newMessage) => {
                console.log("📨 Received new message via socket:", newMessage);

                // Validate message structure before adding to state
                if (newMessage && newMessage._id && newMessage.message) {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                } else {
                    console.error("❌ Invalid message received via socket:", newMessage);
                }
            });

            return () => {
                socket.off("newMessage");
            };
        }
    }, [socket, setMessages]);


}

export default useGetSocketMsg;


