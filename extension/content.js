
// chrome.runtime.onInstalled.addListener(function (details) {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//         chrome.declarativeContent.onPageChanged.addRules([rule1]);
//     });
// });

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
//       chrome.declarativeContent.onPageChanged.addRules([{
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: 'www.figma.com' }
//           })
//         ],
//         actions: [
//           new chrome.declarativeContent.ShowPageAction()
//         ]
//       }]);
//     });
//   });

const waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

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

waitForElm('#react-page').then((container) => {

    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {

                const elem = mutation.addedNodes[0]
                if (elem) {
                    recursiveTranslation(elem)
                }
            }
        }
    });

    observer.observe(container, { childList: true, subtree: true })

});



/*

TODO https://www.figma.com/api/trashed_files_v2?org_id=
TODO https://www.figma.com/api/active_file_users
TODO https://www.figma.com/api/community_shelves?shelf_type=file_browser_recommended_templates


*/
 
// INFO Interceptando /track !!!!!!!!!!!!!!!!!!!!!!! 
  
const originalXHR = window.XMLHttpRequest;
function newXHR() {
    const xhr = new originalXHR();
    xhr.addEventListener('load', function () {
        try {
            if (this.responseURL.includes('track')) {
                if (this.response) {
                    const data = JSON.parse(this.__sentry_xhr__.body)
                    const file_key = [
                        ...[data.properties.fileKey],
                        ...[data.properties.resourceId],
                        ...[data.properties.fileKeys]
                    ].filter(item => item !== undefined)
                    console.log(file_key, data)
                }
            }

        } catch (error) { /**/ }
    });
    return xhr;
}
window.XMLHttpRequest = newXHR;


//INFO Comprimir ou Expandir Project Teams
// Selecionar todos os elementos que começam com a classe "nav_section--section"
const sections = document.querySelectorAll('[class^="nav_section--section"]');

// Adicionar um listener de eventos em cada seção
sections.forEach(section => {
  // Encontrar todos os elementos dentro da seção que começam com a classe "nav_section--orderedFolders"
  const orderedFolders = section.querySelectorAll('[class^="nav_section--orderedFolders"]');

  // Tornar visíveis todos os elementos encontrados
  orderedFolders.forEach(folder => {
    folder.style.display = 'block';
  });

  // Adicionar o listener de eventos
  section.addEventListener('click', event => {
    // Impedir a ação padrão do evento (neste caso, evitar a navegação)
    event.preventDefault();

    // Alternar a exibição dos elementos
    orderedFolders.forEach(folder => {
      folder.style.display = folder.style.display === 'block' ? 'none' : 'block';
    });
  });
});
