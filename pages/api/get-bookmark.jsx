import { db } from "../../firebase-config";
import { doc, collection, getDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const userId = req.body.userId;
      const coll1 = collection(db, "user");
      const doc1 = doc(coll1, userId);
      const coll2 = collection(doc1, "watchlist");
      const doc2 = doc(coll2, "id");
      const docSnap = await getDoc(doc2);
      res.json({ message: "success", marks: docSnap.data().val });
    } catch (err) {
      res.json({ message: "error", err: err });
    }
  }
}
