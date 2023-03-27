
const recursiveTranslation = (parentElem) => {
    if (parentElem && parentElem.children) {
        for (let i = 0; i < parentElem.children.length; i++) {
            const childElem = parentElem.children[i];
            if (childElem.children.length === 0) {
                translate(childElem)
            }
            recursiveTranslation(childElem);
        }
    }
}

const translate = (elem) => {

    const state = elem.getAttribute('figma-translator-state')
    const tooltip = elem.getAttribute('data-tooltip')
    const text = elem.textContent.trim()

    if (!state && (text || tooltip)) {

        elem.style.opacity = 0;

        chrome.runtime.sendMessage({
            type: 'translate',
            data: { text, tooltip }
        }, function (response) {

            if (response && response.state) {

                if (response.state && tooltip == response.origin) {
                    elem.setAttribute('data-tooltip', response.translation);
                    elem.setAttribute('figma-translator-state', true);
                }

                if (response.state && text == response.origin) {
                    elem.textContent = response.translation
                    elem.setAttribute('figma-translator-state', true);
                }

            }

            elem.style.opacity = 1;

        });

    }

}
