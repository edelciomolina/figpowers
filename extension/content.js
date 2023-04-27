// eslint-disable-next-line no-redeclare
// const waitForElm = (selector) => {
//     return new Promise(resolve => {
//         if (document.querySelector(selector)) {
//             return resolve(document.querySelector(selector));
//         }

//         const observer = new MutationObserver(mutations => {
//             if (document.querySelector(selector)) {
//                 resolve(document.querySelector(selector));
//                 observer.disconnect();
//             }
//         });

//         observer.observe(document.body, {
//             childList: true,
//             subtree: true
//         });
//     });
// }

// eslint-disable-next-line no-redeclare
const waitForElm = (selector) => {
    return new Promise(resolve => {

        const waitForElmInterval = setInterval(() => {

            if ($$(selector).length > 0) {
                clearInterval(waitForElmInterval)
                resolve(document.querySelector(selector))
            }

        }, 100)

    });
}


$$(document).ready(function () {
    // salva o estado inicial do histórico de navegação
    var initialState = window.history.state;

    // escuta o evento onpopstate
    window.onpopstate = function (event) {
        // verifica se o estado atual é igual ao estado inicial
        if (event.state === initialState) {
            // o usuário retornou à página anterior
            console.log('Usuário retornou à página anterior.');
            // adicione aqui o código que deseja executar quando o usuário retorna à página anterior
        }
    };
});

const loadFeatures = () => {

    HomeButton.Create()
    PagesGroup.Create()

}


// recarregamento quando a url muda
var currentUrl = window.location.href;
setInterval(function () {
    if (window.location.href !== currentUrl) {
        currentUrl = window.location.href;
        loadFeatures()
    }
}, 1000);

// carregamento quando load no navegador
$$(window).on('load', () => {
    loadFeatures()
})
