// eslint-disable-next-line no-redeclare
const Figma = {};

(() => {

    const CLIENT_ID = 'luoDfoBkJEgCI9Hzeiwt3I'
    const CLIENT_SECRET = '2OPtJfkaglvuWLOz7yWkJ5RYRfZprl'
    //const REDIRECT_URI = 'https://figmapowers.com/figmacb'
    const REDIRECT_URI = 'https://206e99c8547f.ngrok.io/figmacb'

    const SCOPE = 'file_read';
    const AUTH_ENDPOINT = `https://www.figma.com/oauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=&scope=${SCOPE}&response_type=code`;

    let authCode;

    async function authenticate() {
        const tab = await new Promise(resolve => {
            chrome.tabs.create({ url: AUTH_ENDPOINT, active: true }, tab => {
              resolve(tab);
            });
          });
        
          await new Promise(resolve => {
            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
              if (tabId === tab.id && changeInfo.url && changeInfo.url.startsWith(REDIRECT_URI)) {
                chrome.tabs.onUpdated.removeListener(listener);
                const query = new URLSearchParams(new URL(changeInfo.url).search);
                authCode = query.get('code');
                chrome.tabs.remove(tab.id, () => resolve());
              }
            });
          });
 
debugger
          console.log(await getAccessToken())
          return true;
    }

    async function getAccessToken() {
        const response = await fetch('https://www.figma.com/api/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                code: authCode,
                grant_type: 'authorization_code'
            })
        });
        const data = await response.json();
        return data.access_token;
    }

    async function getFigmaData(fileKey) {
        const accessToken = await getAccessToken();
        const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await response.json();
        return data;
    }


    // // 2. After the user is redirected back to the extension with the authorization code, call this function to get an access token
    // async function getAccessToken() {
    //     const authCode = await getAuthCode();
    //     const accessToken = await getAccessToken(authCode);
    //     return accessToken;
    // }

    // // 3. Use the access token to make requests to the Figma API
    // async function getFigmaData() {
    //     const accessToken = await getAccessToken();
    //     const figmaData = await getFigmaData(accessToken);
    //     console.log('Figma data:', figmaData);
    // }

    Figma.Authenticate = authenticate; 
    Figma.getFigmaData = getFigmaData;

})();
