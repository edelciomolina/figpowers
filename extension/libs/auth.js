// eslint-disable-next-line no-redeclare
const Auth = {}

    ; (() => {

        const Login = async newLogin => {

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
                    await StorageEx.Set(localData)
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

            Notifications.Authenticated()

        }

        Auth.Login = Login
        Auth.Authenticated = Authenticated

    })()
