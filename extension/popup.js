
const AddLoginListeners = () => {

    console.log('aqui')
    const authButton = document.getElementById('figma-login');
    authButton.addEventListener('click', FigmaLogin);

}

const FigmaLogin = () => {

    chrome.runtime.sendMessage({
        type: 'figma-login'
    }, (response) => {

        console.log('figma?', response)

    })

}

const PopupOpened = (callback) => {

    chrome.runtime.sendMessage({
        type: 'popup-opened'
    }, (response) => {

        callback()

    });

}


PopupOpened(() => {

    AddLoginListeners()

})



