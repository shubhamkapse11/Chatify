import React from 'react'
import ChatUser from '../../components/ChatUser'
import Messages from '../../components/Message'
import Typesend from './Typesend'
import useConversation from '../../states-manager/useConversation'
import { MessageCircle } from 'lucide-react'

function Right() {
    const { selectedConversation } = useConversation();

    // Show empty state when no user is selected
    if (!selectedConversation) {
        return (
            <div className='flex-1 flex flex-col bg-slate-900 overflow-hidden'>
                <div className='flex-1 flex flex-col items-center justify-center text-slate-400'>
                    <MessageCircle size={64} className='mb-4 text-slate-600' />
                    <h2 className='text-2xl font-semibold text-slate-300 mb-2'>Welcome to Chat App</h2>
                    <p className='text-lg'>Select a user to start chatting</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex-1 flex flex-col bg-slate-900 overflow-hidden'>
            {/* Header */}
            <ChatUser />

            {/* Message Area */}
            <Messages />

            {/* Input Area */}
            <Typesend />
        </div>
    )
}

export default Right


