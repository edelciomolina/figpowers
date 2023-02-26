
self.importScripts( 
    '/firebase-config.js',
    '/vendor/firebase-compat.js')

// função auxiliar para carregar o arquivo de configuração do Firebase
async function loadFirebaseConfig() {
    const response = await fetch('/firebase-config.json');
    const config = await response.json();
    return config;
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
console.log(firebaseConfig)




const Test_Firebase = (request) => {

    // exemplo de consulta ao firestore em background.js
    db.collection('usuarios').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
  
  
  }
  