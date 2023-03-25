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
        let $startYourTrial
        let $signOut

        const PrepareDOM = () => {
            $pages = document.querySelectorAll('.page');
            $loading = document.querySelectorAll('.page.loading')[0];
            $needlogin = document.querySelectorAll('.page.needlogin')[0];
            $logged = document.querySelectorAll('.page.logged')[0];
            $userPhoto = document.querySelectorAll('.user-photo')[0];
            $userName = document.querySelectorAll('.user-name')[0];
            $userEmail = document.querySelectorAll('.user-email')[0];
            $figmaButton = document.querySelectorAll('.figma-login')[0];
            $startYourTrial = document.querySelectorAll('.startYourTrial')[0];
            $signOut = document.querySelectorAll('.signOut')[0];

            document.querySelectorAll('[i18n]').forEach(elem => {
                elem.innerText = chrome.i18n.getMessage(elem.attributes.i18n.value)
            })

        }

        const AddListeners = () => {
            $figmaButton.addEventListener('click', FigmaLogin)
            $startYourTrial.addEventListener('click', StartYourTrial)
            $signOut.addEventListener('click', SignOut)
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

        const StartYourTrial = () => {

            alert('TODO: Stripe Trial')

        }

        const SignOut = async () => {

            chrome.runtime.sendMessage({ type: 'clean-storage' }, response => {

                ChangePage('loading')
                setTimeout(() => ChangePage('needlogin'), 2000)

            })

        }

        const FigmaLogin = () => {
            chrome.runtime.sendMessage({ type: 'figma-login' }, response => {
                ChangePage(response.err ? 'needlogin' : 'logged')
                if (!response.err) {
                    LoadUserData(response)
                }
            })
        }

        const CheckLogin = () => {
            chrome.runtime.sendMessage({ type: 'check-login' }, response => {
                ChangePage(response.err ? 'needlogin' : 'logged')
                if (!response.err) {
                    LoadUserData(response)
                }
            })
        }

        window.addEventListener("DOMContentLoaded", (event) => {
            PrepareDOM()
            ChangePage('loading')
            AddListeners()
            CheckLogin()
        });

    })()
