import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase";
import numeral from "numeral";

export const getItems = async (setItems) => {
  const q = query(collection(db, "items"));
  return onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setItems(items);
  });
};

export const uploadImage = async (file, id) => {
  const storage = getStorage();
  const imageRef = ref(storage, `${id}`);
  await uploadBytes(imageRef, file, { contentType: "image/jpeg" });
  return await getDownloadURL(imageRef);
};

export const getImage = async (path) => {
  const storage = getStorage();
  return getDownloadURL(ref(storage, path));
};

export const updateItem = async (values) => {
  const ref = doc(db, `items/${values.id}`);
  try {
    await updateDoc(ref, {
      brand: values.brand,
      model: values.model,
      price: numeral(values.price).value(),
      barcode: values.barcode,
      website: values.website,
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

export const addItem = async (values) => {
  try {
    const ref = await addDoc(collection(db, "items"), {
      brand: values.brand,
      model: values.model,
      price: numeral(values.price).value(),
      barcode: values.barcode,
      website: values.website,
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

export const removeItem = async (id) => {
  try {
    await deleteDoc(doc(db, "items", id));
  } catch (e) {
    console.log(e);
  }
};
