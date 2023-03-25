// eslint-disable-next-line no-redeclare
const Notifications = {}

    ; (() => {

        const CleanBadge = async () => {

            chrome.action.setBadgeText({ text: '' });

        }

        const Welcome = () => {

            chrome.action.setBadgeText({ text: '!' });

            chrome.notifications.clear('welcome')
            chrome.notifications.create('welcome', {
                type: 'basic',
                iconUrl: 'assets/128x128.png',
                title: chrome.i18n.getMessage("welcomeTitle"),
                message: chrome.i18n.getMessage("welcomeMessage"),
                contextMessage: chrome.i18n.getMessage("welcomeContextMessage"),
                buttons: [{ title: chrome.i18n.getMessage("gotIt") }],
                requireInteraction: true,
            });

        }

        const Authenticated = () => {

            chrome.action.setBadgeText({ text: '' });

            chrome.notifications.clear('authenticated')
            chrome.notifications.create('authenticated', {
                type: 'basic',
                iconUrl: 'assets/128x128.png',
                title: chrome.i18n.getMessage("validAuthTitle"),
                message: chrome.i18n.getMessage("validAuthMessage"),
                buttons: [{ title: chrome.i18n.getMessage("gotoFigma") }],
                requireInteraction: true,
            }, () => {
                chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
                    if (notificationId === 'authenticated') {
                        chrome.tabs.create({ url: "https://figma.com", active: true });
                    }
                });
            });

        }

        const DeleteCategory = (result) => {

            return new Promise(resolve => {

                //TODO i18n
                chrome.notifications.clear('delete_category')
                chrome.notifications.create('delete_category', {
                    type: 'basic',
                    iconUrl: 'assets/128x128.png',
                    title: 'Título da notificação',
                    message: 'Mensagem da notificação',
                    buttons: [
                        { title: 'Yes' },
                        { title: 'No' }
                    ]
                }, () => {
                    chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
                        if (notificationId === 'delete_category') {
                            switch (buttonIndex) {
                                case 0: //Yes  
                                    resolve(true)
                                    break;
                                default: //Cancel or No
                                    resolve(false)
                                    break;
                            }
                        }
                    });
                });


            })

        }

        Notifications.CleanBadge = CleanBadge
        Notifications.Welcome = Welcome
        Notifications.Authenticated = Authenticated
        Notifications.DeleteCategory = DeleteCategory

    })()
