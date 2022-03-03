import { initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  databaseURL: "https://couwcounter.firebaseio.com",
  apiKey: "AIzaSyCz4qjdH-pmdpGztUokdcZcWwJaG68pXhA",
  authDomain: "couwcounter.firebaseapp.com",
  projectId: "couwcounter",
  storageBucket: "couwcounter.appspot.com",
  messagingSenderId: "371367779316",
  appId: "1:371367779316:web:7ef005ea8af25297a9f7a1",
  measurementId: "G-8FL3SFVSJH",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.log("failed-precondition");
  } else if (err.code === "unimplemented") {
    console.log("unimplmented");
  }
});

export const auth = getAuth(app);
