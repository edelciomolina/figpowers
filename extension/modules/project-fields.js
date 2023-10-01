// eslint-disable-next-line no-redeclare
const ProjectFields = {}

    ; (() => {

        const Create = async () => {

            const mainComponent = $$('.figpowers.project-fields')
            const rightButtonGroup = $$('[class*=toolbar_view--buttonGroup][class*=rightButtonGroup]')

            if (rightButtonGroup.length > 0 &&
                mainComponent.length == 0) {

                const componentFetch = await fetch(chrome.runtime.getURL("modules/project-fields.html"));
                const componentHtml = await componentFetch.text();

                rightButtonGroup[0].insertAdjacentHTML('afterbegin', componentHtml);

                const closeProjectFields = (event) => {
                    if (!$$(event.target).closest('.figpowers.project-fields').length) {
                        $$('.figpowers.project-fields').removeClass('fpf_page_active')
                    }
                }

                //Events
                $$('.figpowers.project-fields').on('click', function (event) {

                    if (!$$(event.target).closest('.fpf_page').length) {
                        OpenTab();
                    }



                });
                $$(document)
                    .off('click', closeProjectFields)
                    .on('click', closeProjectFields);
            }

        }

        const OpenTab = (event) => {

            $$('.figpowers.project-fields').toggleClass('fpf_page_active')

        }

        ProjectFields.Create = Create

    })()
