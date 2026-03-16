import { db } from "@/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

export function useItemsActions() {
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
      const docRef = await addDoc(collection(db, "reportedItems"), {
        location: [lat, lng],
        photos: [downloadURL],
        posterId: posterId,
        description: description,
        category: category,
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // fetch all items from firestore
  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "reportedItems"));
      const items = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return items;
    } catch (e: any) {
      console.error("Error fetching documents: ", e);
      throw e;
    }
  };

  const getPosterName = async (posterId: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userDoc = querySnapshot.docs.find((user) => user.id === posterId);
      if (userDoc) {
        const userData = userDoc.data();
        return userData.name;
      } else {
        console.warn(`User with ID ${posterId} not found.`);
        return "Unknown User";
      }
    } catch (e: any) {
      console.error("Error fetching user documents: ", e);
      throw e;
    }
  };

  return { submitItem, fetchItems, getPosterName };
}
