// eslint-disable-next-line no-redeclare
const PagesGroup = {}

    ; (() => {

        const MainSelector = '[class*=pages_panel] > [class*=scroll_container--full] > div > div'

        const MovingDone = (elem, idx) => {

            if (!idx) return
            console.log(elem, idx)

        }

        const MovingObserver = () => {

            var pai = document.querySelector("[class*=pages_panel] > [class*=scroll_container--full] > div > div");
            let elementMovedFirst = null
            let indexFoundFirst = null

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        const elementMovedLast = mutation.removedNodes[0];
                        if (elementMovedLast) {
                            const indexFoundLast = Array.from(pai.children).indexOf(elementMovedLast);

                            elementMovedFirst = !elementMovedFirst ? elementMovedLast : elementMovedFirst
                            indexFoundFirst = !indexFoundFirst ? indexFoundLast : indexFoundFirst

                            setTimeout(() => {

                                if (indexFoundLast != null || indexFoundFirst != null) {

                                    if (indexFoundFirst == indexFoundLast) {
                                        MovingDone(elementMovedLast, indexFoundLast)
                                    } else {
                                        MovingDone(elementMovedFirst, indexFoundFirst)
                                    }

                                    elementMovedFirst = null;
                                    indexFoundFirst = null;

                                }

                            }, 1000)
                        }
                    }
                });
            });

            observer.observe(pai, { childList: true });

        }

        const Create = async () => {

            //INFO carregando htmls necessários
            const pagesGroupHtml = await (await fetch(chrome.runtime.getURL("modules/pages-group.html"))).text()
            const pagesGroupNewHtml = await (await fetch(chrome.runtime.getURL("modules/pages-group.new.html"))).text()

            //INFO insere um novo grupo acima do elemento
            const insertNewGroup = (pageItem) => {
                const parentToInsertNewGroup = pageItem.parentElement
                parentToInsertNewGroup.insertAdjacentHTML('beforebegin', pagesGroupHtml);
                parentToInsertNewGroup.parentElement.classList.add('figpowers', 'pages-group-button-new-dont');
            }

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


                    div.addEventListener("drag", (event) => {
                        console.log("dragging");
                    });

                });

            //INFO ativa observer para verificar paginas arrastadas
            MovingObserver()

        }

        PagesGroup.MainSelector = MainSelector
        PagesGroup.Create = Create

    })()

waitForElm(PagesGroup.MainSelector).then(PagesGroup.Create);




