import { collection, addDoc } from 'firebase/firestore';
import { db, storage, auth } from '@/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export function useSubmitActions() {
  const submitItem = async (
    lat: number,
    lng: number,
    imgUrl: string[],
    posterId: string,
    description: string,
    category: string,
  ) => {
    try {
      //   const response = await fetch(imgUrl[0]);
      //   const blob = await response.blob();
      //   const storageRef = ref(
      //     storage,
      //     imgUrl[0].split('/').slice(-1)[0], // Use the filename from the URL
      //   );
      //   await uploadBytes(storageRef, blob);
      //   const downloadURL = await getDownloadURL(storageRef);
      const downloadURL = imgUrl[0]; // temp replacement
      const docRef = await addDoc(collection(db, 'reportedItems'), {
        location: [lat, lng],
        photos: [downloadURL],
        posterId: posterId,
        description: description,
        category: category,
        createdAt: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return { submitItem };
}
