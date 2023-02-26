let jsonLocales = ''

// chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
//   chrome.pageAction.show(tabs[0].id);
// });

chrome.tabs.onActivated.addListener((x) => {
  chrome.tabs.get(x.tabId, (tab) => {
    if(tab.url.startsWith('https://www.figma.com')) {
        chrome.action.setIcon({ path: "/assets/test.png" })
    } else {
      chrome.action.setIcon({ path: "/assets/ext-icon-128.png" })
    }
  });
});


//INFO lendo os locales
fetch('locales.json')
  .then(response => response.json())
  .then(data => {
    jsonLocales = data
  })
  .catch(error => { });


//INFO faz a identificação da linguagem do usuario
const UserLanguageFrom = () => {

  //TODO coletar isso via chrome.storage.sync.get
  let savedUserLanguage = null

  //INFO caso ainda sem linguagem definida, pega do navegador
  if (!savedUserLanguage) {
    return 'en'
  } else {
    return savedUserLanguage
  }

}

const UserLanguageTo = () => {

  //TODO coletar isso via chrome.storage.sync.get
  let savedUserLanguage = 'pt'

  //INFO caso ainda sem linguagem definida, pega do navegador
  if (!savedUserLanguage) {
    return (navigator.language || navigator.userLanguage).split('-')[0];
  } else {
    return savedUserLanguage
  }

}

//INFO identifica a tradução no arquivo de locales
const FindTranslation = (jsonData, originLanguage, targetLanguage, valuesToSearch) => {

  if (jsonData.length === 0 || valuesToSearch.length == 0) {
    return { state: false };
  }

  for (let i = 0; i < jsonData.length; i++) {
    for (let j = 0; j < valuesToSearch.length; j++) {

      const obj = jsonData[i];
      const val = valuesToSearch[j];
      const exists = Object.prototype.hasOwnProperty.call(obj, targetLanguage)
      const confirmed = val && obj[originLanguage] === val

      if (exists && confirmed) {

        return { state: true, origin: val, translation: obj[targetLanguage] };
 
      }
    }
  }

  return { state: false };

}

const Translate = (request, sender, sendResponse) => {

  const valuesToSearch = [request.data.text, request.data.tooltip]
  const result = FindTranslation(jsonLocales, UserLanguageFrom(), UserLanguageTo(), valuesToSearch)
  return result;

}

const Test_Firebase = (request) => {

  // exemplo de consulta ao firestore em background.js
  db.collection('usuarios').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  });


}

//INFO aguardando solicitação do content
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {

    if (request.type === 'translate') sendResponse(Translate(request, sender, sendResponse))
    if (request.type === 'users') sendResponse(Test_Firebase(request, sender, sendResponse))

  }
);


// const sendToServer = (command, content) => {

//   return new Promise(resolve => {

//     const headers = new Headers()
//     headers.append("Content-Type", "application/json")

//     const url = `https://eo5j498xquqa4k9.m.pipedream.net/${command}`
//     const body = { content }
//     const options = {
//       method: "POST",
//       headers,
//       mode: "cors",
//       body: JSON.stringify(body),
//     }

//     fetch(url, options)  //.then(response => response.json())
//       .then(response => {

//         setTimeout(() => {

//           resolve(response)

//         }, 1000)

//       })

//     // // Exiba um popup indicando que o processo foi concluído
//     // chrome.notifications.create({
//     //   type: 'basic',
//     //   iconUrl: 'icon.png',
//     //   title: 'Processo Concluído',
//     //   message: 'O texto selecionado foi enviado com sucesso.'
//     // })

//   })

// }

