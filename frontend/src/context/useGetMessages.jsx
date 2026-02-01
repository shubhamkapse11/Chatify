import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import useConversation from '../states-manager/useConversation'
import { useAuth } from '../context/useAuth'

function useGetMessages() {
    // const [messages , setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { selectedConversation, messages, setMessages } = useConversation();
    const [authUser, setAuthUser] = useAuth();
    const token = authUser?.data.token;
    console.log(token, "token , authUser", authUser)
    
    const getMessages = async () => {
        setLoading(true);
        try {
            if (!selectedConversation?._id) {
                setLoading(false);
                return;
            }
            const route = `http://localhost:5003/api/messages/message/get/${selectedConversation._id}`;
            const res = await axios.get(route, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            })
            setMessages(res.data.messages)
        } catch (err) {
            console.log("error while api call get messages", err?.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMessages()
    }, [selectedConversation, setMessages]);

    return {
        messages,
        loading,
        // error,
        // getMessages
    }
}

export default useGetMessages