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
// https://github.com/diegohaz/schm
//import schema from 'schm';

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
    const boardsRef = ref(firebaseDatabaseRef, "boards");
    const newBoardPostRef = push(boardsRef);

    return set(newBoardPostRef, boardSchema);
  },

  updateBoard({ commit }, { id, key, value }) {
    const boardsRef = ref(firebaseDatabaseRef, "boards/" + id);

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
    const boardsRef = ref(firebaseDatabaseRef, "boards/" + id);
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
      const boardsRef = ref(firebaseDatabaseRef, 'boards');
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

    const boardTransitRef = ref(firebaseDatabaseRef, "boards/" + id + "/transit");
    const newBoardTransitPostRef = push(boardTransitRef);

    return set(newBoardTransitPostRef, transitSchema);
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