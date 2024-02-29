// import app from '../../firebase'
import React,{useState} from 'react'
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { collection,addDoc } from 'firebase/firestore'


const Signup = ({onLogin}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [nickname,setNickname] = useState('')
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try{
    const auth = getAuth();

    const userCredential = await createUserWithEmailAndPassword(auth,email,password)
    const uid = userCredential.user.uid;
    const userData = {
      uid: uid,
      email: email,
      nickname: nickname,
    }
    await addDoc(collection(db,'users'),userData);
      console.log('пользователь успешно зарегистрирован!')
      onLogin();
      navigate('/home')
    
  }catch(error){
      console.error('ошибка при регистрации пользователя:',error.message)
    }

  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <>
    <p>signup page</p>
    <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
    <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
    <input type="text" placeholder='nickname' value={nickname} onChange={(e) => setNickname(e.target.value)}/>
    <button onClick={handleRegistration}>signUp</button>
    <p>Уже есть аккаунт??</p>
    <button onClick={handleLoginClick}>войти в аккаунт</button>
    </>
    
  )
}

export default Signup