import { initializeApp } from 'firebase/app';

/*
  NOTE:
  Transfer firebase app init here,
  including database init and
  auth init
  - find out if we can access it to the store
*/

console.log('HELLO FIREBAE', initializeApp)

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

export default function({ app }, inject) {
  console.log('firebase', app)
}