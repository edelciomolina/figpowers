// eslint-disable-next-line no-redeclare
const HomeButton = {}

    ; (() => {

        const Create = async () => {

            const homeButtons = $$('.figpowers.home-buttom')
            const homeToolbar = $$('[class*=toolbar_view--toolbar]')

            if (homeToolbar.length > 0 &&
                homeButtons.length == 0) {

                const buttonFetch = await fetch(chrome.runtime.getURL("modules/home-button.html"));
                const buttonHtml = await buttonFetch.text();

                homeToolbar[0].insertAdjacentHTML('afterbegin', buttonHtml);

            }

        }

        HomeButton.Create = Create

    })()
