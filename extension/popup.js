
let timeoutProcessing = null

//avisa o background que o popup foi aberto
chrome.runtime.sendMessage({
    type: 'popup-event'
}, (response) => {
 
    //TODO https://chat.openai.com/chat/690d9c80-f50e-4ad9-91b5-64be39509666
    
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

