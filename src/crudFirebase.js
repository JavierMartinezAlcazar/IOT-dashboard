// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBypC51879ZaKSB0DN0RuILLZEXYhJCvtc",
  authDomain: "proyectoiot-3e763.firebaseapp.com",
  projectId: "proyectoiot-3e763",
  storageBucket: "proyectoiot-3e763.appspot.com",
  messagingSenderId: "1036104208943",
  appId: "1:1036104208943:web:b69564fe06349616386cda",
  measurementId: "G-R5V3G7GXVD"
};

//Conectamos con la base de datos
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//CRUD

// Crea un nuevo documento en una colección específica
export const saveData = (ref,objeto) => addDoc(collection(db,ref),objeto)
// Recupera todos los documentos de una colección específica
export const getDataCollection = (ref) => getDocs(collection(db,ref))
// Establece un listener para cambios en una colección específica
export const getDataChanged_collection = ( ref, callBack) => onSnapshot(collection(db,ref),callBack)
// Establece un listener para cambios en un documento específico dentro de una colección
export const getDataChanged_document = (ref, document, callBack) => onSnapshot(doc(db,ref, document),callBack)
// Elimina un documento específico de una colección
export const deleteData = (id, ref) => deleteDoc(doc(db,ref,id))
// Recupera un documento específico de una colección
export const getData = (id, ref) => getDoc(doc(db,ref,id))
// Actualiza un documento específico en una colección
export const updateData = (id, ref,objeto) => updateDoc(doc(db,ref,id),objeto)
// Funcion para eliminar un campo de un documento por su nombre
export const deleteField = (ref,id,campo) => {
  const docRef = doc(db, ref, id)
  return getDoc(docRef)
    .then((documentSnapshot) => {
      if (documentSnapshot.exists()) {
        const updatedData = { ...documentSnapshot.data() }
        delete updatedData[campo]
        return setDoc(docRef, updatedData)
      } else {
        console.error('El documento no existe')
        throw new Error('El documento no existe')
      }
    })
    .catch((error) => {
      console.error('Error al eliminar el campo:', error.message)
      throw error
    })
}