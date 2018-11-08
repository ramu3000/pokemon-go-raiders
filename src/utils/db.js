import firebase from "firebase";

import { FirebaseConfig } from "../config/keys";

class Firebase {
  constructor() {
    firebase.initializeApp(FirebaseConfig);
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true
    });
  }

  get gyms() {
    return this.db.collection("gyms").get();
  }

  get raids() {
    return this.db.collection("raids").get();
  }
}

export default new Firebase();
