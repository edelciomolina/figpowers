// eslint-disable-next-line no-redeclare
const Server = {}

    ; (() => {
        const Auth = async newLogin => {
            let authData = {}
            let newUser = false

            let localData = await Chrome.GetStorage()
            localData.message = null
            localData.status = null
            localData.error = null

            if (!newLogin && localData.refresh_token) {
                authData = await Figma.Authenticate(localData)
                if (authData.error) {
                    localData = await API.GetUserData(localData)
                    authData = await Figma.Authenticate(localData)
                    if (authData.error) newUser = true
                }
            } else {
                newUser = true
            }

            if (newLogin && newUser) {
                authData = await Figma.Authenticate()
            }

            if (!authData.error) {
                localData = { ...localData, ...authData }
                await Chrome.SetStorage(localData)
                await API.UpdateUserData(localData)
                return {
                    id: authData.id,
                    email: authData.email,
                    handle: authData.handle,
                    img_url: authData.img_url,
                }
            } else {
                return {
                    error: authData.error,
                    message: authData.message,
                }
            }
        }

        Server.Auth = Auth
    })()
