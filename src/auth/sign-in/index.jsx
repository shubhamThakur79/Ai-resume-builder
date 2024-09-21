import { SignIn, SignUp, useUser } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
  const { user, isLoaded, isSignedIn } = useUser()

  return (
    <div className=' flex justify-center h-[100vh]  items-center '>
    { user ? <SignIn /> : <SignUp /> }
    </div>
  )
}

export default SignInPage