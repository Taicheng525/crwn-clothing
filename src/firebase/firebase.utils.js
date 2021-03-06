import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA7HR7R6RpWy7Ghh-m460nSThXhqItI1cw",
  authDomain: "crwn-db-c6b97.firebaseapp.com",
  databaseURL: "https://crwn-db-c6b97.firebaseio.com",
  projectId: "crwn-db-c6b97",
  storageBucket: "crwn-db-c6b97.appspot.com",
  messagingSenderId: "398312422882",
  appId: "1:398312422882:web:f764fd1cb0e539c4874dbb"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
