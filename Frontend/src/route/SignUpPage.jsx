import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const SignUpPage = () => {
  const [showPassword,setShowPassword]=useState(false)
  
  const {signUp,isSigningUp}=useAuthStore()
    <div>
      
    </div>
  )
}

export default SignUpPage
