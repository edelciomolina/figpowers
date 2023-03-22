const AddLoginListeners = () => {
    console.log('aqui')
    const authButton = document.getElementById('figma-login')
    authButton.addEventListener('click', FigmaLogin)
}

const FigmaLogin = () => {
    chrome.runtime.sendMessage({ type: 'figma-login' }, response => {
        console.log('figma?', response)
    })
}

const IsLogged = () => {
    return new Promise(resolve => {
        chrome.runtime.sendMessage({ type: 'check-login' }, response => {
            console.log('figma?', response)
            alert(JSON.stringify(response))
            resolve(true)
        })
    })
}

const PopupOpened = callback => {
    chrome.runtime.sendMessage({ type: 'popup-opened' }, response => {
        console.log('figma?', response)
        callback()
    })
}

PopupOpened(() => {
    AddLoginListeners()
    if (IsLogged()) {
        //TODO
    } else {
        //TODO
    }
})
