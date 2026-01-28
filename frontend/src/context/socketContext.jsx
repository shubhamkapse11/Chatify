import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./useAuth";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [authUser] = useAuth();

    useEffect(() => {
        if (authUser?.data?.userData?._id) {
            const userId = authUser.data.userData._id;
            console.log("🔵 Frontend: Attempting to connect socket for user:", userId);

            const newSocket = io("http://localhost:5003", {
                query: {
                    userId: userId
                }
            });

            newSocket.on("connect", () => {
                console.log("✅ Frontend: Socket connected successfully!", newSocket.id);
            });

            newSocket.on("connect_error", (error) => {
                console.error("❌ Frontend: Socket connection error:", error);
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
                console.log("👥 Frontend: Received online users:", users);
                setOnlineUsers(users);
            });

            // Cleanup on unmount
            return () => {
                console.log("🔴 Frontend: Closing socket for user:", userId);
                newSocket.close();
            };
        } else {
            console.log("⚠️ Frontend: No authenticated user, closing socket if exists");
            // Close socket if user logs out
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};