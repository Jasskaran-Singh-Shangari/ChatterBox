import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'

const ChatContainer = () => {
    const {messages, getMessages, isMessagesLoading}=useChatStore()

    // useEffect(()=>{

    // }, [])

    if (isMessagesLoading)  (<div>Loading...</div>)

  return (
    <div>
      Chat Container
    </div>
  )
}

export default ChatContainer
