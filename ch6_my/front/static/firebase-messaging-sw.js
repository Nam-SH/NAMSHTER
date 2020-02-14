importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

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
messaging.setBackgroundMessageHandler(function(payload){
 
    const title = "All Find";
    const options = {
            body: payload.data.status
    };
 
    return self.registration.showNotification(title,options);
});