import React, { useState } from 'react'
import { db, auth, projectFirestore, projectStorage} from '../firebase'
import firebase from 'firebase'
import { Input, Button } from '@material-ui/core'
import UploadForm from './UploadForm'

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser

        await db.collection('messages').add({
            text: msg,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
                    <UploadForm> UpdaloadForm </UploadForm> 
                    

                </div>
            </form>
        </div>
    )
}

export default SendImage
