import { format } from "date-fns";
import { db } from "firebase-config";
import {
  child,
  onDisconnect,
  onValue,
  push,
  ref,
  serverTimestamp,
  set,
  update,
} from "firebase/database";
import { IUser } from "types/users";

class UtilsFirebase {
  static async writeUserData({
    userId,
    displayName,
    email,
    photoURL,
    ...other
  }: IUser) {
    return await set(ref(db, "users/" + userId), {
      displayName: displayName,
      email: email,
      photoURL: photoURL,
      ...other,
    });
  }
  static async writeFootballData({ userId, ...other }: any) {
    return await update(ref(db, "users/" + userId + "/football"), {
      ...other,
    });
  }

  static async writeUserMessagesData({ roomId, ...other }: any) {
    // const offsetRef = ref(db, ".info/serverTimeOffset");
    // onValue(offsetRef, (snap) => {
    //   const offset = snap.val();
    //   const estimatedServerTimeMs = new Date().getTime() + offset;
    // });

    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), "messages/" + roomId)).key;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates:any = {};
    updates[`/messages/${roomId}/` + newPostKey] = {
      ...other,
    };
    return update(ref(db), updates);
  }
}

export default UtilsFirebase;
