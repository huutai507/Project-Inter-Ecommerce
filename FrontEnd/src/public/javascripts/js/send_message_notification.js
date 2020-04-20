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
messaging.usePublicVapidKey('BAgKcsZSKt4s-tltibDDKe_Imp1J5A9qxWG52QrRVMts2Om5BvzapLyfhwe0fqdGGndsAL79cvt-uisYiOP51No');

function sendMessageNewOrder() {
    messaging.requestPermission()
        .then(function() {

            return messaging.getToken();
        })
        .then(function(tokenMessage) {
            console.log(tokenMessage)
            axios.post('/order', {
                tokenMessage: tokenMessage
            })
        })
        .catch(function(err) {
            console.log('Error');
        })
}
messaging.onMessage((payload) => {
    console.log('Message Receive', payload);
})