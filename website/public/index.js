const addLoginListeners = () => {
  console.log("aqui")
  const authButton = document.getElementById("figma-login")
  authButton.addEventListener("click", Figma.Authenticate)
}

document.addEventListener("DOMContentLoaded", (event) => {
  addLoginListeners()
})
