import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import Loading from '../componants/loading/loading';
import { collection, onSnapshot, query } from 'firebase/firestore';

const Blogcontext = createContext();

function Context({ children }) {
  const [currentuser, setcurrentuser] = useState(null);
  const [loading, setloading] = useState(true);
  const [userloading, setuserloading] = useState(true);
  const [allusers, setallusers] = useState([]);
  const [publish, setpublish] = useState(false);
  const [showcomment, setshowcomment] = useState(false);
  const [commentlength, setcommentlength] = useState(0);
  const [updatedata, setupdatedata] = useState({});
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [authmodal, setauthmodal] = useState(false)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentuser(user || null);
      setloading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getUsers = () => {
      const postRef = query(collection(db, 'users'));
      onSnapshot(postRef, (snapshot) => {
        setallusers(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
        setuserloading(false);
      });
    };
    getUsers();
  }, []);

  const handleSetUpdatedata = (data) => {
    console.log('setupdatedata called with:', data);
    setupdatedata(data);
  }

  return (
    <Blogcontext.Provider value={{
      currentuser,
      setcurrentuser,
      allusers,
      userloading,
      publish,
      setpublish,
      showcomment,
      setshowcomment,
      commentlength,
      setcommentlength,
      updatedata,
      setupdatedata: handleSetUpdatedata,
      title,
      settitle,
      description,
      setdescription,
      authmodal,
      setauthmodal
    }}>
      {loading ? <Loading /> : children}
    </Blogcontext.Provider>
  );
}

export default Context;
export const Blog = () => useContext(Blogcontext);
