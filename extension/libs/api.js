// eslint-disable-next-line no-redeclare
const API = {}

    ; (() => {

        const UpdateUserData = value => {
            return new Promise(resolve => {
                resolve({})
            })
        }

        const GetUserData = name => {
            return new Promise(resolve => {
                resolve({})
            })
        }

        API.GetUserData = GetUserData
        API.UpdateUserData = UpdateUserData
    })()



// chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
//   chrome.pageAction.show(tabs[0].id);
// });

// const sendToServer = (command, content) => {

//   return new Promise(resolve => {

//     const headers = new Headers()
//     headers.append("Content-Type", "application/json")

//     const url = `https://eo5j498xquqa4k9.m.pipedream.net/${command}`
//     const body = { content }
//     const options = {
//       method: "POST",
//       headers,
//       mode: "cors",
//       body: JSON.stringify(body),
//     }

//     fetch(url, options)  //.then(response => response.json())
//       .then(response => {

//         setTimeout(() => {

//           resolve(response)

//         }, 1000)

//       })
