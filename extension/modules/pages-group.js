// eslint-disable-next-line no-redeclare
const PagesGroup = {}

    ; (() => {

        const MainSelector = '[class*=pages_panel] > [class*=scroll_container--full] > div > div'

        const Create = async () => {

            //INFO carregando htmls necessários
            const pagesGroupHtml = await (await fetch(chrome.runtime.getURL("modules/pages-group.html"))).text()
            const pagesGroupNewHtml = await (await fetch(chrome.runtime.getURL("modules/pages-group.new.html"))).text()

            //INFO insere um novo grupo acima do elemento
            const insertNewGroup = (pageItem) => {
                const parentToInsertNewGroup = pageItem.parentElement.parentElement
                parentToInsertNewGroup.insertAdjacentHTML('beforebegin', pagesGroupHtml);
                parentToInsertNewGroup.classList.add('figpowers', 'pages-group-button-new-dont');
            }

            //TODO verifica o elemento arrastado 
            document.querySelector(MainSelector).addEventListener('mouseup', (event) => {
                console.log('Elemento arrastado para fora da div:', event.target);
                // aqui você pode inserir o código que deseja executar quando o elemento é arrastado para fora da div
            });

            //INFOpPercorre todos os itens de página
            const elementosDiv = document.querySelectorAll(`${MainSelector} > div`);
            elementosDiv.forEach(
                div => {

                    //INFO insere botão para novo grupo
                    div.classList.add('figpowers', 'page-item');
                    div.insertAdjacentHTML('afterbegin', pagesGroupNewHtml)

                    //INFO cria evento para criação do novo grupo
                    const buttonNew = div.querySelector('.pages-group-button-new');
                    buttonNew.addEventListener('click', (event) => insertNewGroup(event.target));

                });

        }

        PagesGroup.MainSelector = MainSelector
        PagesGroup.Create = Create

    })()

waitForElm(PagesGroup.MainSelector).then(PagesGroup.Create);




