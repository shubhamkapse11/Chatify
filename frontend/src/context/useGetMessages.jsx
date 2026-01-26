import React from 'react'
import axios from 'axios'


function useGetMessages() {
    // const [messages , setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { selectedConversation, messages, setMessages } = useConversation();

    const getMessages = async () => {
        setLoading(true);
        try {
            if (!selectedConversation && selectedConversation._id) {
                return;
            }
            const route = `/message/get/${selectedConversation._id}`;
            const res = await axios.get(route)
            setMessages(res.data.data)
        } catch (err) {
            console.log("error while api call get messages", err?.message)
        }
    }

    useEffect(() => {
        getMessages()
    }, [selectedConversation, messages]);

    return {
        messages,
        loading,
        // error,
        // getMessages
    }
}

export default useGetMessages