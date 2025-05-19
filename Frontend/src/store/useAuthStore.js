import {create} from "zustand"
import { axiosInstance } from "../utils/axios"
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

    }
}))
