const Figma = {}

;(() => {
  const CLIENT_ID = "luoDfoBkJEgCI9Hzeiwt3I"
  const CLIENT_SECRET = "2OPtJfkaglvuWLOz7yWkJ5RYRfZprl"
  // const REDIRECT_URI = 'https://figpowers.com/auth'
  const REDIRECT_URI = "http://localhost:5000/auth"

  const SCOPE = "file_read"
  const AUTH_ENDPOINT = `https://www.figma.com/oauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=&scope=${SCOPE}&response_type=code`

  let authCode

  const authenticate = async () => {
    window.location = AUTH_ENDPOINT
    await new Promise((resolve) => {
      const checkUrlInterval = setInterval(() => {
        if (window.location.href.startsWith(REDIRECT_URI)) {
          clearInterval(checkUrlInterval)
          const query = new URLSearchParams(window.location.search)
          authCode = query.get("code")
          resolve()
        }
      }, 100)
    })

    console.log(await getAccessToken())
    return true
  }

  const getAccessToken = async () => {
    const response = await fetch("https://www.figma.com/api/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code: authCode,
        grant_type: "authorization_code",
      }),
    })
    const data = await response.json()
    return data.access_token
  }

  const getFigmaData = async (fileKey) => {
    const accessToken = await getAccessToken()
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json()
    return data
  }

  Figma.Authenticate = authenticate
  Figma.getFigmaData = getFigmaData
})()
