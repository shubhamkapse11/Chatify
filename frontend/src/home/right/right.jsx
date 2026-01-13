import React from 'react'
import ChatUser from '../../components/ChatUser'
import Messages from '../../components/Message'
import Typesend from './Typesend'

function Right() {
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

