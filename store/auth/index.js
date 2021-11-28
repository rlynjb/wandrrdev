import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  getRedirectResult,
  updateProfile,
} from "firebase/auth";

/*
  NOTE:
  using google auth
  ref: https://firebase.google.com/docs/auth/web/google-signin
*/

// Get a reference to the auth service
const auth = getAuth();
const provider = new GoogleAuthProvider();
/*
  exclusive to only certain users and not for public use
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
*/

/*
getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    debugger
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    debugger
  });
*/

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
    signInWithRedirect(auth, provider);
  },

  onAuthStateChanged({ commit }, payload) {
    /*
      were using an observer so incase the app hasnt initialize
      auth object, were listening still for changes
    */
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        commit('setUser', user);
      } else {
        // User is signed out
        commit('setUser', null);
      }
    });
  },

  logout({ commit }, payload) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        commit('setUser', null);
        debugger
      }).catch((error) => {
        // An error happened.
        debugger
      });
  },
}