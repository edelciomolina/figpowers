// eslint-disable-next-line no-redeclare
const Popup = {}

    ; (() => {
        const AddLoginListeners = () => {
            document.getElementById('figma-login').addEventListener('click', FigmaLogin)
        }

        const ChangePage = (cmd, response) => {
            alert(`${cmd}: ${JSON.stringify(response)}`)
        }
        const FigmaLogin = () => {
            chrome.runtime.sendMessage({ type: 'figma-login' }, response => {
                ChangePage(response.error ? 'needlogin' : 'logged', response)
            })
        }

        const CheckLogin = () => {
            chrome.runtime.sendMessage({ type: 'check-login' }, response => {
                ChangePage(response.error ? 'needlogin' : 'logged', response)
            })
        }

        const PopupOpened = callback => {
            chrome.runtime.sendMessage({ type: 'popup-opened' }, response => {
                callback()
            })
        }

        PopupOpened(() => {
            AddLoginListeners()
            ChangePage('loading')
            CheckLogin()
        })
    })()
