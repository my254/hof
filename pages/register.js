import React,{ useEffect } from 'react'
import AuthenticationTitle from '../components/Register'
import  app  from '../database/Firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
import { getAuth} from "firebase/auth";

const register = () => {
  const auth = getAuth(app)
  const router = useRouter()
  const [user, loadingA, error] = useAuthState(auth);
     useEffect(() => {
    if(user && !loadingA){
     //Router.push(`/user/${user.uid}`)
     router.push(`/`)
    }
  },[user,loadingA])
  return (
    <div style={{marginTop:80}}>
        <AuthenticationTitle />
    </div>
  )
}

export default register