import React,{ useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuthStore } from '../store/useAuthStore'
import { Loader } from "lucide-react"
import { useThemeStore } from '../store/useThemeStore'


const MainLayout = () => {

  const {authUser, checkAuth,isCheckingAuth}=useAuthStore();
  const { theme }=useThemeStore();

  useEffect(()=>{
    checkAuth()
  }, [checkAuth])

  console.log({ authUser })

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>

    )
  }

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout
