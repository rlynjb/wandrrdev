import { initializeApp } from 'firebase/app';

import {
  getDatabase,
  ref,
  set,
  push,
  update,
  remove,
  onValue,
} from "firebase/database";

/*
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
*/

// https://github.com/diegohaz/schm
//import schema from 'schm';

// https://thewandrr-bb83c-default-rtdb.firebaseio.com/
/*
  NOTE:
  how to generate api key
  ref: https://stackoverflow.com/questions/64690983/web-api-key-is-not-generated-in-firebase-while-creating-a-new-project-as-stated
*/
// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: "AIzaSyAQpWhJkOaD9qsh_r7N0nufhLXWKh43feQ",
  authDomain: "thewandrr-bb83c.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: "https://thewandrr-bb83c-default-rtdb.firebaseio.com/",
  //storageBucket: "bucket.appspot.com"
};

const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);

/*
// Get a reference to the auth service
const auth = getAuth();
const provider = new GoogleAuthProvider();
// exclusive to only certain users and not for public use
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// were using an observer so incase the app hasnt initialize
// auth object, were listening still for changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
*/

// ========================================================

// VUEX STORE
export const state = () => ({
  boards: null,
})

export const mutations = {
  setBoards(state, val) {
    state.boards = val;
  }
}

// SCHEMAS
/*
  NOTE:
  we might want to use some js-data module
  for implementing type, validation, parsing
*/

const transitSchema = {
  name: "",
  cost: "",
  where_purchase: "",
  info_link: ""
}

const boardSchema = {
  area_name: "", // area code/name ex. Durham near Duke University
  area_type: "", // ex. urban, downtown, burrough, suburbs
  area_coordinates: "",
  area_address: "", // full address
  name: "", // ex. apt complex or airbnb or coliving.com, etc
  price: "",
  stayed_date_from: "",
  stayed_date_to: "",
  desc: "",
  amenities: "", // shared resources
  included: "", // whats included privately
  website: "", // if there is
  arrival_from: "",
  arrival_transport: "",
  arrival_cost: "",
  transit: {} // transitSchema
}

export const actions = {
  postBoard({ commit }, { key, value }) {
    boardSchema[key] = value;

    /*
      Create a new post reference with an auto-generated id
      ref: https://firebase.google.com/docs/database/web/lists-of-data?authuser=0
    */
    const boardsRef = ref(database, "boards");
    const newBoardPostRef = push(boardsRef);

    return set(newBoardPostRef, boardSchema);
  },

  updateBoard({ commit }, { id, key, value }) {
    const boardsRef = ref(database, "boards/" + id);

    /*
      NOTE:
      this will update specific field
      ref: https://firebase.google.com/docs/database/web/read-and-write?authuser=0#update_specific_fields
    */
    return update(boardsRef, {
      [key]: value
    });
  },

  deleteBoard({ dispatch }, id) {
    const boardsRef = ref(database, "boards/" + id);
    remove(boardsRef)
  },

  getBoards({ commit }) {
    /*
      NOTE:
      watch if a child has been added on this collection (boards)
      ref: https://bigcodenerd.org/realtime-database-firebase-promises-api/

      after playing around with it, onValue automatically detects
      changes to a collection whether if something is added, deleted
    */
    return new Promise((resolve, reject) => {
      const boardsRef = ref(database, 'boards');

      onValue(boardsRef, (data) => {
        if (data) {
          commit('setBoards', data.val());
          resolve(data.val());
          return;
        }
        reject(null);
      });
    });
  },

  postBoardTransit({ commit }, { id, key, value }) {
    transitSchema[key] = value;

    const boardTransitRef = ref(database, "boards/" + id + "/transit");
    const newBoardTransitPostRef = push(boardTransitRef);

    return set(newBoardTransitPostRef, transitSchema);
  },

  updateBoardTransit({ commit }, { boardID, transitID, key, value }) {
    const boardTransitRef = ref(database, "boards/" + boardID + "/transit/" + transitID);

    return update(boardTransitRef, {
      [key]: value
    });
  },

  deleteBoardTransit({ dispatch }, { boardID, transitID }) {
    const boardTransitRef = ref(database, "boards/" + boardID + "/transit/" + transitID);
    remove(boardTransitRef);
  },
}