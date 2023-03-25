self.importScripts(
    'libs/firebase.js', //
    'libs/storage.js',
    'libs/auth.js',
    'libs/startup.js',
    'libs/figma.js',
    'libs/translate.js',
    'libs/notifications.js',
    'libs/api.js'
)

Translate.LoadLocates()

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'clean-storage') StorageEx.Clean().then(result => sendResponse(result))
    if (request.type === 'figma-login') Auth.Login(true).then(result => sendResponse(result))
    if (request.type === 'check-login') Auth.Login(false).then(result => sendResponse(result))
    if (request.type === 'translate') Translate.Execute(request).then(result => sendResponse(result))
    return true
})
