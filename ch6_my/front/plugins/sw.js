import firebase from "firebase";

if (process.client) {
  if (!firebase.apps.length) {
    var firebaseConfig = {
      apiKey: "AIzaSyCjZYFP6B0FRWWu5bSIwufnx1S1-Y-0E6s",
      authDomain: "namshter.firebaseapp.com",
      databaseURL: "https://namshter.firebaseio.com",
      projectId: "namshter",
      storageBucket: "namshter.appspot.com",
      messagingSenderId: "282840452097",
      appId: "1:282840452097:web:a30a338c6f93aa4fe78400",
      measurementId: "G-5LRQ578CVY"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();

    const messaging = firebase.messaging();

    messaging.usePublicVapidKey(
      "BM0-EM96OfP5r2JATcINBwWD8rSC0YLkquDFI3IGSXZEAleDRLxvVTFTI2pOmTjAyB4yUWI3NWV5NiiyWABHX5k"
    );

    Notification.requestPermission()
      .then(() => {
        console.log("Notification permission granted.");
        return messaging.getToken();
      })
      .then(result => {
        console.log("The token is: ", result);
      })
      .catch(err => {
        console.log("Unable to get permission to notify.", err);
      });
  }
}

export default firebase;