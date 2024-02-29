import React,{useEffect, useState} from 'react'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = ({onLogin}) => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      onLogin();
      navigate('/home')
    }
  },[])

const handleLogin = () =>{
  const auth = getAuth();
  signInWithEmailAndPassword(auth,email,password)
  .then((userCredential)=>{
    const user = userCredential.user;
    localStorage.setItem('user',JSON.stringify(user));
    console.log("пользователь успешно вошел")
    onLogin()
    navigate('/home')
  })
  .catch((error)=>{
    console.error('ошибка при входе в аккаунт:',error.message)
  })
}

const handleSignupClick = () => {
  navigate('/signup')
}

  return (
    <>
    <div>Login page</div>
    <input type="email" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
    <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
    <button onClick={handleLogin}>Login</button>
    <p>нет аккаунта?</p>
    <button onClick={handleSignupClick}>зарегистрироваться</button>
    </>
  )
}

export default Login