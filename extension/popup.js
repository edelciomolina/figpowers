// eslint-disable-next-line no-redeclare
const Popup = {}

    ; (() => {

        let $pages
        let $loading
        let $logged
        let $userPhoto
        let $userName
        let $userEmail
        let $needlogin
        let $figmaButton

        const PrepareDOM = () => {
            $pages = document.querySelectorAll('.page');
            $loading = document.querySelectorAll('.page.loading')[0];
            $needlogin = document.querySelectorAll('.page.needlogin')[0];
            $logged = document.querySelectorAll('.page.logged')[0];
            $userPhoto = document.querySelectorAll('.user-photo')[0];
            $userName = document.querySelectorAll('.user-name')[0];
            $userEmail = document.querySelectorAll('.user-email')[0];
            $figmaButton = document.querySelectorAll('.figma-login')[0];
        }

        const AddListeners = () => {
            $figmaButton.addEventListener('click', FigmaLogin)
        }

        const ChangePage = (cmd) => {

            $pages.forEach(function (page) {
                page.style.display = 'none';
            });
            switch (cmd) {
                case 'loading': $loading.style.display = "flex"; break;
                case 'needlogin': $needlogin.style.display = "flex"; break;
                case 'logged': $logged.style.display = "flex"; break;
                default: break;
            }

        }
        const LoadUserData = (response) => {

            $userPhoto.style.backgroundImage = `url(${response.img_url})`;
            $userName.innerHTML = response.handle;
            $userEmail.innerHTML = response.email;

        }

        const FigmaLogin = () => {
            chrome.runtime.sendMessage({ type: 'figma-login' }, response => {
                ChangePage(response.error ? 'needlogin' : 'logged')
                if (!response.error) {
                    LoadUserData(response)
                }
            })
        }

        const CheckLogin = () => {
            chrome.runtime.sendMessage({ type: 'check-login' }, response => {
                ChangePage(response.error ? 'needlogin' : 'logged')
                if (!response.error) {
                    LoadUserData(response)
                }
            })
        }

        const PopupOpened = callback => {
            chrome.runtime.sendMessage({ type: 'popup-opened' }, response => {
                callback(response)
            })
        }

        PopupOpened(async () => {
            PrepareDOM()
            AddListeners()
            ChangePage('loading')
            CheckLogin()
        })
    })()
