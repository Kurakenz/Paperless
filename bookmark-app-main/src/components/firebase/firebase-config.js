import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signOut } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAugRXFvRBsjSUqAMSSW3QIgtLZfH2UDyY",
  authDomain: "paperless-f8d21.firebaseapp.com",
  projectId: "paperless-f8d21",
  storageBucket: "paperless-f8d21.appspot.com",
  messagingSenderId: "218836016328",
  appId: "1:218836016328:web:29087d91ca1ad284a659fd",
  measurementId: "G-80504FBQ9B"
};

// initialize firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider().setCustomParameters({
  prompt: "select_account",
});

// add data to firebase
export const booksCollection = collection(database, "books");
export const addDataToFirebase = async (id, library, shelf) => {
  const currentDoc = doc(database, "books", `${id}`);
  await setDoc(
    currentDoc,
    { id, library: [...library], shelf: { ...shelf } },
    { merge: true }
  );
};

// sign user out and remove data from local storage
export const signUserOut = async () => {
  await signOut(auth)
    .then(() => localStorage.removeItem("user"))
    .catch((error) => toast.error(error, { autoClose: 5000 }));
};
