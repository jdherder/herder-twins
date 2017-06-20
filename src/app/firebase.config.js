import firebase from 'firebase';

export default function () {
  const config = {
    apiKey: "AIzaSyDdOpQ55N7XvETqv-bi_n8BxwDPZRIgb3U",
    authDomain: "herder-twins.firebaseapp.com",
    databaseURL: "https://herder-twins.firebaseio.com",
    projectId: "herder-twins",
    storageBucket: "herder-twins.appspot.com",
    messagingSenderId: "1018994098947"
  };

  firebase.initializeApp(config);
}