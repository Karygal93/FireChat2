import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp ,auth, db} from '../firebase';
import SendMessage from '../Componets/SendMessage';
import firebase from 'firebase'



const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name);
    
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const UploadImage = await storageRef.getDownloadURL();
      const uid = auth.currentUser.uid;
      const photoURL = auth.currentUser.photoURL;
      const msg = "";
      const createdAt = timestamp();
      

      await db.collection('messages').add({
        text: msg,
        photoURL,
        uid,
        UploadImage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;