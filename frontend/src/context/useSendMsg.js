import React , { useState } from 'react'
import useConversation from '../states-manager/useConversation';
import useGetMessages from './useGetMessages';
import axios from 'axios';

function useSendMsg() {
  const [loading , setLoading] = useState(false);
  const {messages , setMessages , selectedConversation} = useConversation();
 const sendMessages = async (message)=>{
    setLoading(true);
    try {
        if(!selectedConversation){
            setLoading(false);
            return;
        }
        const route = `http://localhost:5003/api/messages/message/send/${selectedConversation._id}`;
        const res = await axios.post(route , {
            message : message
        })
        if(res.data){
            setMessages([...messages , res.data])
        }
    } catch (error) {
        console.log("error while api call send messages", error?.message)
    } finally {
        setLoading(false);
    }
 }
    return{
        loading, sendMessages
    }
}   

export default useSendMsg;