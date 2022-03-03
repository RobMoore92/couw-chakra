import {
  addDoc,
  collection,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import numeral from "numeral";
import { uploadImage } from "./itemQueries";
import { formatISO } from "date-fns";

export const getJobs = async (setJobs) => {
  const q = query(collection(db, "jobs"));
  return onSnapshot(q, (querySnapshot) => {
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
    });
    setJobs(jobs);
  });
};

export const addJob = async (values) => {
  const client = JSON.parse(values.client);
  try {
    await addDoc(collection(db, "jobs"), {
      name: values.name,
      description: values.description,
      start: formatISO(values.start),
      due: formatISO(values.due),
      clientID: client.id,
      clientName: client.name,
    });
  } catch (e) {
    console.log(e);
  }
};
