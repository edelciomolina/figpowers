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

waitForElm('#react-page').then((container) => {

    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {

                const elem = mutation.addedNodes[0]
                if (elem) {
                    //TODO
                    //recursiveTranslation(elem) 
                }
            }
        }
    });

    observer.observe(container, { childList: true, subtree: true })

});



waitForElm('#react-page [class*=toolbar_view--toolbar]').then((container) => {

    HomeButton.Create()

});


