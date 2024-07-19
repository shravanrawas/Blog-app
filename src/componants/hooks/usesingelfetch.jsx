import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

function useSingleFetch(collectionName, id, subCollection) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName || !id || !subCollection) {
      setError('Invalid parameters provided to useSingleFetch');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const postRef = query(collection(db, collectionName, id, subCollection));
        const unsubscribe = onSnapshot(postRef, (snapshot) => {
          setData(snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })));
          setLoading(false);
        }, (err) => {
          setError(err.message);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, id, subCollection]);

  return { data, loading, error };
}

export default useSingleFetch;
