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

            //INFO insere um novo grupo acima do elemento
            const newGroup = (pageItemFigma) => {

                const pageItem = $(pageItemFigma).parents('.fgp_gpg_item')
                const initialColor = pageItem.css('border-color') || "#FFFFFF"

                $(pageItemFigma).colorPick({
                    initialColor,
                    paletteLabel: 'Group Color',
                    allowCustomColor: false,
                    allowRecent: false,
                    palette: ["#FFFFFF", "#FF0000", "#008000", "#0000FF",
                        "#FFFF00", "#FFC0CB", "#800080", "#808080",
                        "#FFA500", "#A52A2A", "#40E0D0", "#000000",
                    ],
                    onColorSelected: function () {

                        if (this.color.toUpperCase() === '#FFFFFF') {
                            pageItem.removeClass('fgp_gpg_group');
                        } else {
                            pageItem.addClass('fgp_gpg_group');
                            pageItem.css('border-color', this.color)
                            pageItem.find('[class*=pages_panel--pageRow]').css('background-color', `${this.color}20`)
                            pageItem.find('[class*=pages_panel--pageRow] span').css('background-color', 'initial')
                        }
                    },
                });


            }

            //INFO percorre todos os itens de página
            const elementosDiv = document.querySelectorAll(`${MainSelector} > div`);
            elementosDiv.forEach(
                div => {

                    //INFO insere botão para novo grupo
                    div.classList.add('fgp_gpg_item');
                    div.insertAdjacentHTML('afterbegin', pagesGroupHtml)

                    //INFO cria evento para criação do novo grupo
                    const buttonNew = $('.fgp_gpg_color', div);
                    buttonNew.on('mousedown', (event) => newGroup(event.target));

                });

            //INFO ativa observer para verificar paginas arrastadas
            MovingObserver()

        }

        PagesGroup.MainSelector = MainSelector
        PagesGroup.Create = Create

    })()

waitForElm(PagesGroup.MainSelector).then(PagesGroup.Create);




