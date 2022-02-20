import { db } from "../../firebase-config";
import { doc, collection, setDoc, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const userId = req.body.userId;
      const id = req.body.id;
      const coll1 = collection(db, "user");
      const doc1 = doc(coll1, userId);
      const coll2 = collection(doc1, "watchlist");
      const doc2 = doc(coll2, "id");
      const docSnap = await getDoc(doc2);

      var docData = [];
      if (docSnap.data().val) {
        docData = docSnap.data().val;
      }
      docData.push(id);
      console.log(docData);
      await setDoc(doc(coll2, "id"), {
        val: docData,
      });
      res.json({ message: "success" });
    } catch {
      console.log("bye");
      res.json({ message: "error" });
    }
  }
}
