// eslint-disable-next-line no-redeclare
const Chrome = {}

    ; (() => {
        chrome.tabs.onActivated.addListener(x => {
            chrome.tabs.get(x.tabId, tab => {
                if (tab.url.startsWith('https://www.figma.com')) {
                    chrome.action.setIcon({
                        path: {
                            16: 'assets/16x16.png',
                            24: 'assets/24x24.png',
                            32: 'assets/32x32.png',
                            48: 'assets/48x48.png',
                            96: 'assets/96x96.png',
                            128: 'assets/128x128.png',
                        },
                    })
                } else {
                    chrome.action.setIcon({
                        path: {
                            16: 'assets/d_16x16.png',
                            24: 'assets/d_24x24.png',
                            32: 'assets/d_32x32.png',
                            48: 'assets/d_48x48.png',
                            96: 'assets/d_96x96.png',
                            128: 'assets/d_128x128.png',
                        },
                    })
                }
            })
        })

        const SetStorage = value => {
            return new Promise(resolve => {
                if (!chrome.storage.sync) resolve
                chrome.storage.sync.set(value, resolve)
            })
        }

        const GetStorage = name => {
            return new Promise(resolve => {
                if (!chrome.storage.sync) resolve
                resolve(chrome.storage.sync.get())
            })
        }

        Chrome.GetStorage = GetStorage
        Chrome.SetStorage = SetStorage
    })()
