
const figma = {};
(() => {

  const clientId = 'luoDfoBkJEgCI9Hzeiwt3I';
  const clientSecrete = '2OPtJfkaglvuWLOz7yWkJ5RYRfZprl';
  const redirectUri = 'https://figmapowers.com/figma-callback';

  const figmaApi = new fdk.FigmaApi({
    clientId,
    clientSecrete,
    redirectUri,
  });

  figmaApi.getOAuth2Token().then(token => {
    console.log(token);
  });

  const signin = () => {
    figmaApi.getOAuth2Token().then(token => {
      alert(token)
    });
  };

  const logout = () => {
    localStorage.clear();
  };

  figma.signin = signin;
  figma.logout = logout;
})();

const google = {};
(() => {

  let AuthGoogle = new firebase.auth.GoogleAuthProvider();
  firebase.auth().onAuthStateChanged(user => {
    let result = false;
    if (user) {
      alert(user.id)
    }
    if (!result) {
      var afterBootReady = document.getElementsByClassName("afterBootReady")[0];
      !!afterBootReady && afterBootReady.classList.remove("afterBootReady");
    }
  });

  const redirect = url => {
    return document.location.href.indexOf(url) == -1 && (document.location.href = url);
  };

  const signin = () => {
    firebase
      .auth()
      .signInWithPopup(AuthGoogle)
      .then(result => { })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  google.signin = signin;
  google.logout = logout;
})();

const github = {};
(() => {

  const signin = () => {
    alert('TODO')
  };

  const logout = () => {
    alert('TODO')
  };

  github.signin = signin;
  github.logout = logout;
})();
