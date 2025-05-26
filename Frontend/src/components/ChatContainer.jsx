import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import ChatSkeleton from './skeletons/ChatSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { format } from "timeago.js"

const ChatContainer = () => {
    const {messages, getMessages, isMessagesLoading, selectedUser}=useChatStore()
    const { authUser } = useAuthStore()
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

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message)=>(
          <div
          key={message._id}
          className={` chat ${message.senderId===authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img 
                src={message.senderId===authUser._id ? authUser.avatar || "/avatar.png" : selectedUser.avatar || "/avatar.png" } alt="profile-pic" />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <span>{format(message.createdAt)}</span>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}

      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
