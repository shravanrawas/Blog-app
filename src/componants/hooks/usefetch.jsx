import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

function usefetch(collectionname) {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getData = () => {
      const dataRef = query(collection(db, collectionname), orderBy('created', 'desc'));
      onSnapshot(dataRef, (snapshot) => {
        setdata(snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })));
        setloading(false);
      });
    };
    getData();
  }, [collectionname]);

  return {
    data,
    loading,
  };
}

export default usefetch;
