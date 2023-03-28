// eslint-disable-next-line no-redeclare
const HomeButton = {}

    ; (() => {

        const RedirectToFiles = () => {
            window.location.assign('https://figma.com/files')
        }

        const Create = async () => {

            const buttonFetch = await fetch(chrome.runtime.getURL("modules/home-button.html"));
            const buttonHtml = await buttonFetch.text();

            const insertElem = document.querySelector('[class*=toolbar_view--toolbar]');
            insertElem.insertAdjacentHTML('afterbegin', buttonHtml);

            const homeButtonElem = document.querySelector('.figpowers.home-buttom');
            homeButtonElem.addEventListener('click', RedirectToFiles);
        }

        HomeButton.Create = Create

    })()

waitForElm('[class*=toolbar_view--toolbar]').then((container) => {

    HomeButton.Create()

});
