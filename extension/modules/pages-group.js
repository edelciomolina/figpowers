// eslint-disable-next-line no-redeclare
const PagesGroup = {}

    ; (() => {

        const MainSelector = '[class*=pages_panel] > [class*=scroll_container--full] > div > div'

        // const MovingDone = (elem, idx) => {

        //     if (!idx) return
        //     ChangeCounter()

        // }

        const AddNewGroup = (pageItemFigma) => {

            const pageItem = $$(pageItemFigma).parents('.fgp_gpg_item')

            let initialColor = colorToHex(pageItem.css('border-color'))
            if (initialColor === '#000000e6') {
                initialColor = '#FFFFFF'
            }

            $$(pageItemFigma).colorPick({
                initialColor,
                paletteLabel: 'Group Color',
                allowCustomColor: false,
                allowRecent: false,
                palette: ["#FFFFFF", "#FF0000", "#008000", "#0000FF",
                    "#FFFF00", "#FFC0CB", "#800080", "#808080",
                    "#FFA500", "#A52A2A", "#40E0D0", "#000000",
                ],
                onColorSelected: function () {

                    let color = this.color

                    let items = ''
                    if (color.toUpperCase() === '#FFFFFF') {

                        pageItem.removeClass('fgp_gpg_group');

                    } else {

                        pageItem.addClass('fgp_gpg_group');

                    }

                    ChangeCounter()
                    pageItem.css('border-color', color)
                    pageItem.find('[class*=pages_panel--pageRow]').css('background-color', `${color}20`)

                },
            });


        }

        const ChangeCounter = () => {

            const elementosDiv = document.querySelectorAll(`${MainSelector} > div`);
            elementosDiv.forEach(
                div => {

                    const pageItem = $$(div)

                    if (pageItem.hasClass('fgp_gpg_group')) {


                        let items = 0

                        let idx = pageItem.index()
                        let nextGroupIdx = pageItem.nextAll('.fgp_gpg_group').first().index()
                        let total = pageItem.parent().find('> div').length
                        if (nextGroupIdx == -1) {
                            items = total - idx - 1
                        } else {
                            items = nextGroupIdx - idx - 1
                        }

                        pageItem.find('[class*=pages_panel--pageRow]').attr('data-before', items)

                    }

                });

        }



        const MovingObserver = () => {

            var pai = document.querySelector("[class*=pages_panel] > [class*=scroll_container--full] > div > div");
            // let elementMovedFirst = null
            // let indexFoundFirst = null

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {


                        ChangeCounter()

                        // const elementMovedLast = mutation.removedNodes[0];
                        // if (elementMovedLast) {
                        //     const indexFoundLast = Array.from(pai.children).indexOf(elementMovedLast);

                        //     elementMovedFirst = !elementMovedFirst ? elementMovedLast : elementMovedFirst
                        //     indexFoundFirst = !indexFoundFirst ? indexFoundLast : indexFoundFirst

                        //     setTimeout(() => {

                        //         if (indexFoundLast != null || indexFoundFirst != null) {

                        //             if (indexFoundFirst == indexFoundLast) {
                        //                 MovingDone(elementMovedLast, indexFoundLast)
                        //             } else {
                        //                 MovingDone(elementMovedFirst, indexFoundFirst)
                        //             }

                        //             elementMovedFirst = null;
                        //             indexFoundFirst = null;

                        //         }

                        //     }, 1000)
                        // }
                    }
                });
            });

            observer.observe(pai, { childList: true });

        }

        const Create = () => {

            waitForElm('[class*=pages_panel] > [class*=scroll_container--full] > div > div').then(
                async () => {

                    const pagesGroupHtml = await (await fetch(chrome.runtime.getURL("modules/pages-group.html"))).text()

                    //INFO percorre todos os itens de página
                    const elementosDiv = document.querySelectorAll(`${MainSelector} > div`);
                    elementosDiv.forEach(
                        div => {

                            const pageItem = $$(div)

                            pageItem.on('click', (event) => {

                                var $element = $$(this);
                                var elementOffset = $element.offset();
                                var mouseX = event.pageX - elementOffset.left;
                                var mouseY = event.pageY - elementOffset.top;

                                alert(mouseX)

                            })


                            //INFO insere botão para novo grupo
                            div.classList.add('fgp_gpg_item');
                            div.insertAdjacentHTML('afterbegin', pagesGroupHtml)

                            //INFO cria evento para criação do novo grupo
                            const buttonNew = $$('.fgp_gpg_color', div);
                            buttonNew.on('mousedown', (event) => AddNewGroup(event.target));

                        });

                    //INFO ativa observer para verificar paginas arrastadas
                    MovingObserver()


                });

        }

        PagesGroup.MainSelector = MainSelector
        PagesGroup.Create = Create

    })()


