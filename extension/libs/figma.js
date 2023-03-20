// eslint-disable-next-line no-redeclare
const Figma = {}

;(() => {
    const CLIENT_ID = 'luoDfoBkJEgCI9Hzeiwt3I'
    const CLIENT_SECRET = '2OPtJfkaglvuWLOz7yWkJ5RYRfZprl'
    //const REDIRECT_URI = 'https://figmapowers.com/figmacb'
    const REDIRECT_URI = 'http://localhost:5000/auth'

    const SCOPE = 'file_read'
    const AUTH_ENDPOINT = `https://www.figma.com/oauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=&scope=${SCOPE}&response_type=code`

    let authData

    async function authenticate () {
        const tab = await new Promise(resolve => {
            chrome.tabs.create({ url: AUTH_ENDPOINT, active: true }, tab => {
                resolve(tab)
            })
        })

        let authCode
        await new Promise(resolve => {
            chrome.tabs.onUpdated.addListener(function listener (tabId, changeInfo) {
                if (tabId === tab.id && changeInfo.url && changeInfo.url.startsWith(REDIRECT_URI)) {
                    chrome.tabs.onUpdated.removeListener(listener)
                    const query = new URLSearchParams(new URL(changeInfo.url).search)
                    authCode = query.get('code')
                    chrome.tabs.remove(tab.id, () => resolve())
                }
            })
        })

        authData = await authToken(authCode)
        return true
    }

    async function authToken (authCode) {
        const response = await fetch('https://www.figma.com/api/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                code: authCode,
                grant_type: 'authorization_code',
            }),
        })
        return await response.json()
    }

    async function refreshToken (refresh_token) {
        const response = await fetch(`https://www.figma.com/api/oauth/refresh?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&refresh_token=${refresh_token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        authData = { ...authData, ...(await response.json()) }
        return true
    }
    async function accessToken () {
        await refreshToken(authData.refresh_token)
        return authData.access_token
    }

    async function whoAmI () {
        const token = await accessToken()
        const response = await fetch(`https://api.figma.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return { ...authData, ...(await response.json()) }
    }

    Figma.Authenticate = authenticate
    Figma.WhoAmI = whoAmI
})()
