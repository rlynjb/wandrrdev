import {
  ref,
  set,
  push,
  update,
  remove,
  onValue,
} from "firebase/database";

import {
  firebaseDatabaseRef
} from '../plugins/firebase.js';


// ========================================================

// VUEX STORE
export const state = () => ({
  boards: null,
  activities: null,
  collections: {
    name: '',
    schemas: {},
  },
  boardSchema: {
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
    transit: {}, // transitSchema
    main_photo: "",
  },
  transitSchema: {
    name: "",
    cost: "",
    where_purchase: "",
    info_link: ""
  },
  activitySchema: {
    title: "",
    date: "",
    address: "",
    coordinates: "",
    neighbor: "",
    time: "",
    cost: "",
    desc: "",
    photo: "",
    video: "",
  },
});

export const mutations = {
  setBoards(state, val) {
    state.boards = val;
  },

  setActivities(state, val) {
    state.activities = val;
  },

  setBoardPostValue(state, val) {
    state.boardSchema.area_name = val;
  },

  setActivityPostValue(state, val) {
    state.activitySchema.title = val;
  }
}


export const actions = {
  getBoardPosts({ commit }) {
    /*
      NOTE:
      watch if a child has been added on this collection (boards)
      ref: https://bigcodenerd.org/realtime-database-firebase-promises-api/

      after playing around with it, onValue automatically detects
      changes to a collection whether if something is added, deleted
    */
    return new Promise((resolve, reject) => {
      const postsRef = ref(firebaseDatabaseRef, "boards");
      onValue(postsRef, (data) => {
        if (data) {
          resolve(data.val());
          commit('setBoards', data.val());
          return;
        }
        reject(null);
      });
    });
  },

  getActivityPosts({ commit }) {
    /*
      NOTE:
      watch if a child has been added on this collection (boards)
      ref: https://bigcodenerd.org/realtime-database-firebase-promises-api/

      after playing around with it, onValue automatically detects
      changes to a collection whether if something is added, deleted
    */
    return new Promise((resolve, reject) => {
      const postsRef = ref(firebaseDatabaseRef, "activities");
      onValue(postsRef, (data) => {
        if (data) {
          resolve(data.val());
          commit('setActivities', data.val());
          return;
        }
        reject(null);
      });
    });
  },

  createBoardPost({ commit, state }) {
    /*
      Create a new post reference with an auto-generated id
      ref: https://firebase.google.com/docs/database/web/lists-of-data?authuser=0
    */
    const collectionRef = ref(firebaseDatabaseRef, "boards");
    const newPostRef = push(collectionRef);

    return set(newPostRef, state.boardSchema);
  },

  createActivityPost({ commit, state }) {
    /*
      Create a new post reference with an auto-generated id
      ref: https://firebase.google.com/docs/database/web/lists-of-data?authuser=0
    */
    const collectionRef = ref(firebaseDatabaseRef, "activities");
    const newPostRef = push(collectionRef);

    return set(newPostRef, state.activitySchema);
  },

  updatePost({ commit }, { collection, id, key, value }) {
    const postRef = ref(firebaseDatabaseRef, `${ collection }/${ id }`);

    /*
      NOTE:
      this will update specific field
      ref: https://firebase.google.com/docs/database/web/read-and-write?authuser=0#update_specific_fields
    */
    return update(postRef, {
      [key]: value
    });
  },

  deletePost({ dispatch }, { collection, id }) {
    const boardsRef = ref(firebaseDatabaseRef, `${ collection }/${ id }`);
    remove(boardsRef)
  },

  postBoardTransit({ commit, state }, { id, key, value }) {
    state.transitSchema[key] = value;

    const boardTransitRef = ref(firebaseDatabaseRef, "boards/" + id + "/transit");
    const newBoardTransitPostRef = push(boardTransitRef);

    return set(newBoardTransitPostRef, state.transitSchema);
  },

  updateBoardTransit({ commit }, { boardID, transitID, key, value }) {
    const boardTransitRef = ref(firebaseDatabaseRef, "boards/" + boardID + "/transit/" + transitID);

    return update(boardTransitRef, {
      [key]: value
    });
  },

  deleteBoardTransit({ dispatch }, { boardID, transitID }) {
    const boardTransitRef = ref(firebaseDatabaseRef, "boards/" + boardID + "/transit/" + transitID);
    remove(boardTransitRef);
  },
}