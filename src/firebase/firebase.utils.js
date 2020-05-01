import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCe8BCtwEUOphlEzm6qZbV3joYWqb3cCuE",
    authDomain: "ecommerce-db-73d7a.firebaseapp.com",
    databaseURL: "https://ecommerce-db-73d7a.firebaseio.com",
    projectId: "ecommerce-db-73d7a",
    storageBucket: "ecommerce-db-73d7a.appspot.com",
    messagingSenderId: "399963241893",
    appId: "1:399963241893:web:534be7be45690cc627fc4c",
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const{displayName, email} = userAuth;
        const createdAt = new Date ();

        try{
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData

            })

        } catch (error) {
        console.log('error creating user',error.message );

        }
    }

        return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
