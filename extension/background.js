
self.importScripts(
  'libs/firebase.js',
  'libs/figma.js',
  'libs/translate.js'
)

Translate.LoadLocates()



// chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
//   chrome.pageAction.show(tabs[0].id);
// });

chrome.tabs.onActivated.addListener((x) => {
  chrome.tabs.get(x.tabId, (tab) => {
    if (tab.url.startsWith('https://www.figma.com')) {
      chrome.action.setIcon({ path: "/assets/test.png" })
    } else {
      chrome.action.setIcon({ path: "/assets/ext-icon-128.png" })
    }
  });
});

//INFO aguardando solicitação do content
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {

    if (request.type === 'popup-opened') sendResponse()
    if (request.type === 'figma-login') sendResponse(Figma.Authenticate())
    if (request.type === 'translate') sendResponse(Translate.Execute(request))
    // if (request.type === 'users') sendResponse(Test_Firebase(request, sender, sendResponse))

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

