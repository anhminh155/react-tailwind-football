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
    const estimatedServerTimeMs = new Date().getTime();
    return await set(
      ref(db, "messages/" + roomId + `/${estimatedServerTimeMs}`),
      {
        ...other,
      }
    );
  }
}

export default UtilsFirebase;
