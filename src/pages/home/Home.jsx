import React,{useState,useEffect} from 'react'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { collection,getDocs,where,query,doc,onSnapshot, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import AccountChangesForm from '../accountChangesForm/AccountChangesForm'

const Home = ({onLogout}) => {
  const currentUser = getAuth().currentUser;
  const [user,setUser] = useState(null)
  const [nickname,setNickname] = useState('')
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [email,setEmail] = useState('')

  const openModal = () =>{
    setIsModalOpen(true)
  }

  const closeModal = () =>{
    setIsModalOpen(false)
  }

  const updateNickname = (newNickname) => {
    setNickname(newNickname)
  }
  const updateEmail = (newEmail) => {
    setEmail(newEmail)
  }

  const logoutFunc = () => {
    onLogout();
  }

  useEffect(()=>{

 
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth,async (user)=>{
      if(user){
        setUser(user)

        const useRef = collection(db,'users');
        const q = query(useRef,where('uid','==',user.uid));
        const querySnapshot = await getDocs(q)
        
        if(!querySnapshot.empty){
          const userData = querySnapshot.docs[0].data();
          setNickname(userData.nickname)
          setEmail(user.email)
        }else{
          console.error('user document does not exits',error.message)
        }
      }else{
        setUser('')
        setNickname('')
        setEmail('')
      }
    })
    return () => unsubscribe()
  },[])


  


  return (
    <>
    <h1>Welcome to you HomePage! {nickname}</h1>
    {user && (
      <p>You are logged in as: {currentUser.email}</p>

    )}
          <h2>user UID: {currentUser ? currentUser.uid : ''}</h2>

    <button onClick={openModal}>change account settings</button>
    <button onClick={logoutFunc}>logout</button>

    {
      isModalOpen && (
        <div className='modal'>
          <AccountChangesForm user={currentUser} onNicknameUpdate={updateNickname} onEmailUpdate={updateEmail}/>
          <button onClick={closeModal}>Close</button>
        </div>
      )
    }
    </>
  )
}

export default Home