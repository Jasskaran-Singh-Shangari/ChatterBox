import { create } from "zustand"
import { axiosInstance } from "../utils/axios"
import toast from "react-hot-toast"


export const useChatStore=create((set)=>({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async ()=>{
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get("/message/users")
            set({users: res.data})
        } catch (error) {
            toast.error("Something went wrong!!!")
        }finally{
            set({isUsersLoading: false})
        }

    },
    geMessages: async (userId)=>{
        set({isMessagesLoading: true})
        try {
            const res=await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error("Something went wrong!!!")
        }finally{
            set({isMessagesLoading: false})
        }
    },
    setSelectedUser: (selectedUser)=>{
        set({selectedUser})
    }
}))