import { db,auth } from '../firebase'

import React, { useState, useEffect, useRef } from 'react'
import SendMessage from './SendMessage'
import SignOut from './SingOut'
import UploadForm from './UploadForm'
import { Modal } from '@material-ui/core'
import ImageGrid from './ImageGrid';
import { motion } from 'framer-motion';



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
                {messages.map(({ id, text, photoURL, uid, UploadImage}) => (
                    <div>
                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <img class="profile" src={photoURL} alt="" />
                            { selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
                            <p>{text}</p>

                            
                                 <div className="img-grid">
                                 <motion.div className="img-wrap" key={id} 
                                   layout
                                   whileHover={{ opacity: 1 }}
                                   onClick={() => setSelectedImg(UploadImage)}
                                 >
                                   <motion.img class="chatimg " src={UploadImage} 
                                     initial={{ opacity: 0 }}
                                     animate={{ opacity: 1 }}
                                     transition={{ delay: 1 }}
                                   />
                                 </motion.div>
                               </div>  

                            

                            
                        

                                               

      

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


