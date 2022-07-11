import { Button } from '@mui/material'
import React from 'react'
import './Login.css'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice' 

function Login() {

  const dispatch = useDispatch()
  const provider = new GoogleAuthProvider()

    const signIn = () => {
      signInWithPopup(auth, provider)
        .then(({ user }) => {
          dispatch(login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL 
          }))
        })
        .catch(error => console.log(error)) 
    }

  return (
    <div className='login'>
        <div className="login__container">
            <img 
            src="https://static.dezeen.com/uploads/2020/10/gmail-google-logo-rebrand-workspace-design_dezeen_2364_col_0.jpg" 
            alt="" 
            />
            <Button variant='contained' color='primary' onClick={signIn}>Login</Button>
        </div>
    </div>
  )
}

export default Login