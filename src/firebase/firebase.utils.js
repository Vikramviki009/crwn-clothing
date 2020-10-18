import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAbhr8NWNrvgwNblfgAlfYbgKIWOtkaEzg",
    authDomain: "crwn-db-4986d.firebaseapp.com",
    databaseURL: "https://crwn-db-4986d.firebaseio.com",
    projectId: "crwn-db-4986d",
    storageBucket: "crwn-db-4986d.appspot.com",
    messagingSenderId: "773810867322",
    appId: "1:773810867322:web:8d00c278d95573c8dc7fc3",
    measurementId: "G-HXPLH1BRRN"
  };

  export const createUserProfileDocument=async (userAuth, additionalData)=>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;