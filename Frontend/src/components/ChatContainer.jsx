import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import ChatSkeleton from './skeletons/ChatSkeleton'

const ChatContainer = () => {
    const {messages, getMessages, isMessagesLoading, selectedUser}=useChatStore()

    useEffect(()=>{
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages])

    if (isMessagesLoading)  return (
        <div className='flex flex-1 flex-col overflow-auto'>
            <ChatHeader />
            <ChatSkeleton />
            <MessageInput/>
        </div>
    )

  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader />

      <p>Messages ...</p>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
