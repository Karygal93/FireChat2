import { db,auth } from '../firebase'

import React, { useState, useEffect, useRef } from 'react'
import SendMessage from './SendMessage'
import SignOut from './SingOut'
import UploadForm from './UploadForm'
import { Modal } from '@material-ui/core'
import ImageGrid from './ImageGrid';


//import Modal from './Component/Modal';




function Chat() {
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    const [selectedImg, setSelectedImg] = useState(null);
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <div>
            <SignOut />
            <div className="msgs">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img class="profile" src={photoURL} alt="" />
                            { selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
                            <p>{text}</p>

                            <ImageGrid setSelectedImg={setSelectedImg} />
      

                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <UploadForm scroll={scroll} />
            


            <div ref={scroll}></div>
            
        </div>
    )
}

export default Chat
