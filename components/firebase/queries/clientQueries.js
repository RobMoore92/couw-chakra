import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import numeral from "numeral";
import { uploadImage } from "./itemQueries";

export const addClient = async (values) => {
  try {
    const ref = await addDoc(collection(db, "clients"), {
      fname: values.fname,
      lname: values.lname,
      company: values.company,
      email: values.email,
      phone: values.phone,
    });
    if (values.image) {
      const url = await uploadImage(values.image, ref.id);
      await updateDoc(ref, {
        image: url,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateClient = async (values) => {
  console.log(values.id);
  const ref = doc(db, `clients/${values.id}`);
  try {
    await updateDoc(ref, {
      fname: values.fname,
      lname: values.lname,
      company: values.company,
      email: values.email,
      phone: values.phone,
    });
    if (values.image) {
      const url = await uploadImage(values.image, ref.id);
      await updateDoc(ref, {
        image: url,
      });
    } else {
      await updateDoc(ref, {
        image: null,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
export const getClients = async (setClients) => {
  const q = query(collection(db, "clients"));
  return onSnapshot(q, (querySnapshot) => {
    const clients = [];
    querySnapshot.forEach((doc) => {
      clients.push({ id: doc.id, ...doc.data() });
    });
    setClients(clients);
  });
};

export const removeClient = async (id) => {
  try {
    await deleteDoc(doc(db, "clients", id));
  } catch (e) {
    console.log(e);
  }
};
