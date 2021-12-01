import {
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  firebaseAuth,
  firebaseProvider,
} from '../../plugins/firebase.js';


export const state = () => ({
  isUserAuthenticated: null,
});

export const mutations = {
  setUser(state, val) {
    state.isUserAuthenticated = val;
  }
}

export const actions = {
  loginWithGoogle({ commit }, payload) {
    signInWithRedirect(firebaseAuth, firebaseProvider);
  },

  onAuthStateChanged({ commit }, payload) {
    /*
      were using an observer so incase the app hasnt initialize
      auth object, were listening still for changes
    */
    return new Promise((resolve, reject) => {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          resolve(user);
        } else {
          // User is signed out
          reject(null);
        }
      });
    });
  },

  logout({ commit }, payload) {
    return new Promise((resolve, reject) => {
      return signOut(firebaseAuth)
        .then(() => {
          // Sign-out successful.
          resolve(null);
        }).catch((error) => {
          // An error happened.
          reject(error);
        });
    });
  },
}