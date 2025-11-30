import { create } from "zustand"
import { axiosInstance } from "../utils/axios"
import toast from "react-hot-toast"
// import axios from "axios"
import { io } from "socket.io-client"

const BASE_URL="http://localhost:5002"

export const useAuthStore=create((set, get)=>({
    authUser: null,
    isSigningUp: false,
    IsLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
            get().connectSocket()
        } catch (error) {
            console.log(`ERROR in checkAuth: ${error}`)
            set({authUser: null})
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signUp: async (data)=>{
        set({isSigningUp: true});
        try {
            const res=await axiosInstance.post("/auth/signUp", data)
            toast.success("Account created successfully")
            set({authUser: res.data});
            get().connectSocket()
        } catch (error) {
            // toast.error(error.response.data.message)
            toast.error("Error signing up")
        }finally{
            set({isSigningUp: false})
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("/auth/signOut")
            set({authUser: false})
            get().disconnectSocket()
            toast.success("Logged out successfully")

        } catch (error) {  
            // toast.error(error.response.data.message)
            toast.error("Error signing out")   
            
        }
    },

    login: async(data)=>{
        set({IsLoggingIn: true})
        try {
            const res=await axiosInstance.post("/auth/signIn", data)
            set({authUser: true})
            toast.success("Successfully logged in")
            get().connectSocket()
        } catch (error) {
            toast.error("Error logging in")
        }finally{
            set({IsLoggingIn: false})
        }
    },

    updateProfile: async(data)=>{
        set({updateProfile: true});
        try {
            const res=axiosInstance.put("/auth/update-profile", data)
            set({authUser: res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            console.Console.log(`ERRPR: ${error}`)
            toast.error("Error while updating")
        } finally{
            set({ isUpdatingProfile: false})
        }
    },
    connectSocket: ()=>{
        const { authUser }= get();
        if(!authUser || get().socket?.connected) return;

        const socket=io(BASE_URL, {
            query:{
                userId:authUser._id
            },
        })
        socket.connect()

        set({socket})

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers: userIds})
        })

    },
    disconnectSocket: ()=>{
        if(get().socket?.connected) get().socket.disconnect();
    }
}))
