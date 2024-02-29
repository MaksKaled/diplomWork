import { EmailAuthProvider, getAuth, reauthenticateWithCredential, sendEmailVerification, updateEmail, updatePassword, verifyBeforeUpdateEmail } from 'firebase/auth'
import { updateDoc,doc,collection,query,where,getDocs } from 'firebase/firestore'
import React,{useState} from 'react'
import { db } from '../../firebase'


const AccountChangesForm = ({onNicknameUpdate,onEmailUpdate}) => {
    const [newEmail,setNewEmail] = useState('')
    const [password,setPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [newNickname,setNewNickname] = useState('')


    const handleChangeEmail = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (currentUser) {
                const credential = EmailAuthProvider.credential(currentUser.email, password); // Создаем учетные данные с помощью EmailAuthProvider
                await reauthenticateWithCredential(currentUser, credential); // Повторная аутентификация пользователя

                await updateEmail(currentUser, newEmail); 
                const userId = currentUser.uid;

                // Обновление почты в Firestore
                const userQuery = query(collection(db, 'users'), where('uid', '==', userId));
                const userSnapshot = await getDocs(userQuery);

                if (!userSnapshot.empty) {
                    const userDoc = userSnapshot.docs[0];
                    await updateDoc(userDoc.ref, { email: newEmail });
                } else {
                    console.error('Пользователь не найден в Firestore');
                }
                onEmailUpdate(newEmail)
                console.log('Почтовый адрес успешно обновлен');
                setNewEmail('')
                setPassword('')
            } else {
                console.error('Пользователь не аутентифицирован');
            }
        } catch (error) {
            console.error('Ошибка при обновлении почтового адреса:', error);
        }
    }

    const handleChangePassword = async () =>{
        try {
            if(!newPassword){
                alert('please enter a new password!')
                return;
            }
            const auth = getAuth()
            await updatePassword(auth.currentUser,newPassword)
            alert('password successfully updated')
            setNewPassword('')
        } catch (error) {
            console.error('error updating password:', error.message);
        }
    }

    const handleUpdateNickname = async () => {
        try {
            if (!newNickname) {
                alert('Please enter a new nickname!');
                return;
            }
    
            const auth = getAuth();
            const user = auth.currentUser;
    
            if (!user) {
                console.error('User is not authenticated.');
                return;
            }
    
            const usersRef = collection(db, 'users');
            const userQuery = query(usersRef, where('uid', '==', user.uid));
            const userSnapshot = await getDocs(userQuery);
    
            if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                await updateDoc(doc(db, 'users', userDoc.id), { nickname: newNickname });
                alert('Nickname successfully updated');
                setNewNickname('')

                if(onNicknameUpdate){
                    onNicknameUpdate(newNickname)
                }
            } else {
                console.error('User document not found in Firestore');
            }
        } catch (error) {
            console.error('Error updating nickname:', error.message);
        }
    }
    
  return (
    <div>
        <h2>Account Settings</h2>
        <label>New Email:</label>
        <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
        <button onClick={handleChangeEmail}>Change Email</button>
        <label>Password:</label> {/* Добавляем поле для ввода пароля */}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />


        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
        <button onClick={handleChangePassword}>Change Password</button>

        <label>New Nickname:</label>
        <input type="text" value={newNickname} onChange={(e) => setNewNickname(e.target.value)}/>
        <button onClick={handleUpdateNickname}>Change Nickname</button>
    </div>
  )
}

export default AccountChangesForm