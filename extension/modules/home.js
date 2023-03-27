// eslint-disable-next-line no-redeclare
const HomeButton = {}

    ; (() => {

        const Create = () => {
            const meuElemento = document.querySelector('[class*=toolbar_view--toolbar]');
            const novoHTML = '<button class="figpowers home-buttom"></button>';
            meuElemento.insertAdjacentHTML('afterbegin', novoHTML);

            const meuBotao = document.querySelector('.figpowers.home-buttom');
            meuBotao.addEventListener('click', function () {
                window.location.assign('https://www.figma.com/files');
            });
        }

        HomeButton.Create = Create
    })()



