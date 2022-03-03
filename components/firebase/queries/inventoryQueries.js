import {
  collection,
  doc,
  onSnapshot,
  query,
  increment,
  deleteDoc,
  updateDoc,
  addDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import numeral from "numeral";
import { uploadImage } from "./itemQueries";

export const getInventory = async (setInventory, jobID) => {
  const q = query(collection(db, "jobs", jobID, "inventory"));
  return onSnapshot(q, (querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setInventory(items);
  });
};

export const increaseQuantity = async (jobID, itemID, values, toast) => {
  const itemDoc = doc(db, "jobs", jobID, "inventory", itemID);
  const itemSnap = await getDoc(itemDoc);
  if (itemSnap.exists()) {
    const test = await updateDoc(itemDoc, {
      quantity: increment(1),
    }).then(() => {
      toast({
        title: `${values.brand} ${values.model} added`,
        description: `${itemSnap.data().quantity + 1} in inventory`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
    console.log(test);
  }
};

export const decreaseQuantity = async (jobID, itemID, quantity) => {
  const itemDoc = doc(db, "jobs", jobID, "inventory", itemID);
  if (quantity === 1) {
    await removeInventoryItem(jobID, itemID);
  } else {
    await updateDoc(itemDoc, {
      quantity: increment(-1),
    });
  }
};

export const removeInventoryItem = async (jobID, itemID) => {
  const itemDoc = doc(db, "jobs", jobID, "inventory", itemID);
  const itemSnap = await getDoc(itemDoc);
  if (itemSnap.exists()) {
    await increaseQuantity(jobID, itemID);
  }
  await deleteDoc(itemDoc);
};

export const addInventoryItem = async (jobID, itemID, values, toast) => {
  try {
    const itemDoc = doc(db, "jobs", jobID, "inventory", itemID);
    const itemSnap = await getDoc(itemDoc);
    if (itemSnap.exists()) {
      await increaseQuantity(jobID, itemID, values, toast);
    } else {
      await setDoc(doc(db, "jobs", jobID, "inventory", itemID), {
        brand: values.brand,
        model: values.model,
        price: values.price,
        barcode: values.barcode,
        website: values.website,
        image: values.image,
        quantity: 1,
      }).then(() => {
        toast({
          title: `${values.brand} ${values.model} added`,
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
};
