import React from 'react'
import SearchComponent from '../../components/Search'
import { cn } from '../../lib/utils'
import { LogOut } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/useAuth'
import useConversation from '../../states-manager/useConversation'
import useLogout from '../../context/useLogout'
import { useSocketContext } from '../../context/socketContext'
function Left() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [authUser] = useAuth();
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { logout, loading: logoutLoading } = useLogout();
    const { socket, onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(users._id)

    const handleUserClick = (user) => {
        setSelectedConversation(user);
    };

    // Static user data
    function getAlluser() {
        setLoading(true);
        setError(null);
        const url = "http://localhost:5003/api/users/user";
        axios.get(url, {
            withCredentials: true,
        })
            .then((response) => {
                console.log("response", response)
                const filteredUsers = response.data.data.filter(user => user._id !== authUser.data.userData._id);
                setUsers(filteredUsers);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setError("Failed to fetch users. Please try again later.");
                setLoading(false);
            });
    }
    useEffect(() => {
        getAlluser();
    }, []);

    // console.log("users", users)
    return (
        <div className='w-[30%] h-full bg-slate-950 border-r border-slate-800 flex flex-col'>
            {/* Header */}
            <h1 className='text-2xl font-bold p-4 text-white tracking-wide'>Chat App</h1>

            {/* Search */}
            <SearchComponent />

            {/* Divider */}
            <hr className='border-slate-800 my-2' />

            {/* User List Script */}
            <div className='flex-1 overflow-y-auto px-2 space-y-2 no-scrollbar'>
                {loading ? (
                    <div className='flex flex-col items-center justify-center h-full text-slate-400'>
                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2'></div>
                        <span>Loading users...</span>
                    </div>
                ) : error ? (
                    <div className='flex flex-col items-center justify-center h-full text-red-500 p-4 text-center'>
                        <span className='mb-2'>{error}</span>
                        <button
                            onClick={getAlluser}
                            className='text-sm bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded-md transition-colors'
                        >
                            Retry
                        </button>
                    </div>
                ) : users.length === 0 ? (
                    <div className='flex items-center justify-center h-full text-slate-500'>
                        <span>No users found</span>
                    </div>
                ) : (
                    users?.map((user) => (
                        <div
                            key={user._id}
                            className={cn(
                                `flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${selectedConversation?._id === user._id ? "bg-slate-800" : ""
                                }`,
                                "hover:bg-slate-800 text-slate-200 hover:text-white"
                            )}
                            onClick={() => handleUserClick(user)}
                        >
                            {/* Avatar Wrapper */}
                            <div className="relative">
                                {/* Online Indicator */}
                                {onlineUsers.includes(user._id) && (
                                    <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-slate-800" />
                                )}

                                {/* Avatar */}
                                <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium">
                                    {user.name
                                        ? user.name.split(" ").map(n => n[0]).join("")
                                        : "?"}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex flex-col">
                                <span className="font-medium">{user.name}</span>
                                <span className="text-xs text-slate-400">{user.email}</span>
                            </div>
                        </div>

                    ))
                )}
            </div>
            <div className='p-4 flex items-center gap-2 bg-slate-800  rounded-lg hover:bg-slate-700 transition-colors cursor-pointer' onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                <button className='text-white px-4 py-2' disabled={logoutLoading}>
                    {logoutLoading ? 'Logging out...' : 'Logout'}
                </button>
            </div>
        </div>
    )
}

export default Left
