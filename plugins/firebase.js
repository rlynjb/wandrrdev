import { initializeApp } from 'firebase/app';

import {
  getDatabase,
} from "firebase/database";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

/*
  NOTE:
  Transfer firebase app init here,
  including database init and
  auth init
  - find out if we can access it to the store
*/

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

const firebaseInit = initializeApp(firebaseConfig);
const firebaseDatabaseRef = getDatabase(firebaseInit);

/*
  NOTE:
  using google auth
  ref: https://firebase.google.com/docs/auth/web/google-signin
*/
// Get a reference to the auth service
const firebaseAuth = getAuth();
const firebaseProvider = new GoogleAuthProvider();
/*
  exclusive to only certain users and not for public use
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
*/


/*
NOTE: testing and playing around with vue plugins
still need to learn more about Vue plugins tho
export default (context, inject) => {
  inject('helloTest', val => console.log('kirby', val));
  inject('initFirebase', () => firebaseInit);
  // initialize app
  // initialize auth and its methods
}
*/

export {
  firebaseInit,
  firebaseDatabaseRef,
  firebaseAuth,
  firebaseProvider,
}
