// eslint-disable-next-line no-redeclare
const Server = {
    Auth: async () => {
        await Figma.Authenticate()
        console.log( await Figma.WhoAmI() )
        console.log( await Figma.WhoAmI() )
        debugger
    },
}
