import Firebase from 'firebase'

export default database => {
    let config = {
        apiKey: "AIzaSyAaaAphMFYJTWPF7pe1nBIkSmLy5AB_0WM",
        authDomain: "devmeetup-74f32.firebaseapp.com",
        databaseURL: "https://devmeetup-74f32.firebaseio.com",
        projectId: "devmeetup-74f32",
        storageBucket: "",
        messagingSenderId: "334324140892"
    };

    Firebase.initializeApp(config);
    return Firebase.database().ref("devmeetup-74f32")
}
