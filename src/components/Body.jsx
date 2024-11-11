import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'


const Body = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dispatch(addUser({
          uid: uid,
          email: email,
          displayName: displayName,
        }))
        // navigate("/browse")
      } else {
        dispatch(removeUser())
        // navigate("/login")
      }
  })
})

  return (
    <div>
        <Login />
        <Browse />
    </div>
  )
}

export default Body