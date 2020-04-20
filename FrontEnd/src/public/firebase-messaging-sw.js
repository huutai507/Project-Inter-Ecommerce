importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCQcy-HXGouiPuePmQmeqzokjmKqcECbo4",
    authDomain: "nodejs-32049.firebaseapp.com",
    databaseURL: "https://nodejs-32049.firebaseio.com",
    projectId: "nodejs-32049",
    storageBucket: "nodejs-32049.appspot.com",
    messagingSenderId: "201802873764",
    appId: "1:201802873764:web:a398e7390816af90b95f31",
    measurementId: "G-5Q02W13SDM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
});