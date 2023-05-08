// eslint-disable-next-line no-redeclare
const API = {}

    ; (() => {

        const UpdateUserData = value => {
            return new Promise((resolve, reject) => {
                sendToServer('POST', 'auth', value).then(resolve, reject)
            })
        }

        const GetUserData = value => {
            return new Promise((resolve, reject) => {
                sendToServer('POST', 'auth', value).then(resolve, reject)
            })
        }

        const sendToServer = (method, endpoint, body) => {

            return new Promise((resolve, reject) => {

                const headers = new Headers()
                headers.append("Content-Type", "application/json")

                const url = `http://localhost:5000/api/${endpoint}`
                const options = {
                    method,
                    headers,
                    mode: "cors",
                    body: JSON.stringify(body),
                }

                fetch(url, options)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })

            })

        }

        API.GetUserData = GetUserData
        API.UpdateUserData = UpdateUserData
    })()
