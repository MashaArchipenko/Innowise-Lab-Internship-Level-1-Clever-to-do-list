import firebase from 'firebase'

//console.log(`${process.env.REACT_APP_API_KEY}`);
const fire =  firebase.initializeApp(
{
    apiKey: "AIzaSyBVhOkPiyC1GmA90x5m8G2wQGrgbsH6aBk",//process.env.REACT_APP_API_KEY,
    authDomain: "react-project-c5fa9.firebaseapp.com",//process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: "https://react-project-c5fa9-default-rtdb.firebaseio.com",//process.env.REACT_APP_DATABASE_URL,
    projectId: "react-project-c5fa9",//process.env.REACT_APP_PROJECT_ID,
    storageBucket: "react-project-c5fa9.appspot.com",//process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: "280448464031",//process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: "1:280448464031:web:216edc31b841171c31deaa",//process.env.REACT_APP_APP_ID
}
);

export default fire;