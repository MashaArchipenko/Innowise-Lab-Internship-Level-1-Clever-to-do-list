import firebase from 'firebase'
import 'firebase/auth'
import dotenv from  'dotenv'
import path from 'path'
console.log(process.env.REACT_APP_API_KEY)
const fire =  firebase.initializeApp(
{
    
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_APP_ID
}
);
firebase.analytics();
firebase.auth();
export default fire;