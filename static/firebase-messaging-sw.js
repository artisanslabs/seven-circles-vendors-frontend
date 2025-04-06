
    importScripts(
      'https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js'
    )
    importScripts(
      'https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js'
    )
    firebase.initializeApp({"apiKey":"AIzaSyCqRJYxxZrtaThO_BJG5R-P3gt1mZVh8-Q","authDomain":"vendors-platform.firebaseapp.com","projectId":"overleck-platform","storageBucket":"vendors-platform.appspot.com","messagingSenderId":"1013339049932","appId":"1:1013339049932:web:24bd910c900ad28d495769","measurementId":"G-JRMX6DM2RP"})

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging()

    