import { create } from "zustand"
import { axiosInstance } from "../utils/axios"
import toast from "react-hot-toast"
// import axios from "axios"

export const useAuthStore=create((set)=>({
    authUser: null,
    isSigningUp: false,
    IsLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
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
    }
}))
