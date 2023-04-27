// eslint-disable-next-line no-redeclare
const StorageEx = {}

    ; (() => {

        const Auth = async newLogin => {
            let authData = null
            let newUser = false

            let localData = await StorageEx.Get() || {}
            localData.message = null
            localData.status = null
            localData.err = null

            if (!newLogin && localData.refresh_token) {
                authData = await Figma.Authenticate(localData)
                if (!authData || authData.err) {
                    localData = await API.GetUserData(localData)
                    authData = await Figma.Authenticate(localData)
                    if (!authData || authData.err) newUser = true
                }
            } else {
                newUser = true
            }

            if (newLogin && newUser) {
                authData = await Figma.Authenticate()
            }

            if (!authData) {

                return {
                    err: true
                }

            } else {

                if (!authData || authData.err) {

                    return {
                        err: authData.err,
                        message: authData.message,
                    }

                } else {

                    localData = { ...localData, ...authData }
                    await SetStorage(localData)
                    await API.UpdateUserData(localData)
                    newLogin && await Authenticated()
                    return {
                        id: authData.id,
                        email: authData.email,
                        handle: authData.handle,
                        img_url: authData.img_url,
                    }

                }

            }

        }

        const Authenticated = () => {

            Notification.Authenticate()

        }

        const PopupOpened = async () => {

            chrome.action.setBadgeText({ text: '' });

        }

        const DeleteCategory = valur => {

            chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
                switch (buttonIndex) {
                    case 0: //
                        // Ação 1
                        break;
                    case 1:
                        // Ação 2
                        break;
                    default:
                        break;
                }
            });

        }

        const SetStorage = async value => {
            if (!chrome.storage.sync) return
            const keyName = chrome.runtime.getManifest().name
            const objValue = {}
            objValue[keyName] = value
            chrome.storage.sync.set(objValue)
            return
        }

        const GetStorage = async () => {
            if (!chrome.storage.sync) return
            const keyName = chrome.runtime.getManifest().name
            let result = await chrome.storage.sync.get(keyName)
            result = result ? result[keyName] : result
            return result
        }

        const CleanStorage = async () => {
            if (!chrome.storage.sync) return
            const keyName = chrome.runtime.getManifest().name
            await chrome.storage.sync.remove(keyName);
            return
        }

        StorageEx.Set = SetStorage
        StorageEx.Get = GetStorage
        StorageEx.Clean = CleanStorage

    })()
