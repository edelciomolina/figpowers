
let timeoutProcessing = null

//avisa o background que o popup foi aberto
chrome.runtime.sendMessage({
    type: 'popup-event'
}, (response) => {
 
    //fica solicitando retorno do backend
    // setInterval(() => {
 
    //     chrome.runtime.sendMessage({
    //         type: 'popup-read'
    //     }, (response) => {

    //         //assim que há retorno finaliza o interval
    //         clearInterval(timeoutProcessing)

    //         //atualiza tela com as opções para escolha
    //         document.getElementById("selected-text").innerText = response.status

    //     });

    // }, 100)
 
});

