import { db } from "firebase-config";
import { ref, set, update } from "firebase/database";
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
}

export default UtilsFirebase;
