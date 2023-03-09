

self.importScripts(
  '/firebase-config.js',
  '/vendor/firebase-compat.js')

firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();
//console.log(firebaseConfig)


// const Test_Firebase = (request) => {

//   // exemplo de consulta ao firestore em background.js
//   db.collection('usuarios').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//     });
//   });


// }
