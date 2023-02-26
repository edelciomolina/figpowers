

//INFO lendo os locales
fetch('/locales.json')
  .then(response => response.json())
  .then(data => {
    jsonLocales = data
  })
  .catch(error => { });


//INFO faz a identificação da linguagem do usuario
const UserLanguageFrom = () => {

  //TODO coletar isso via chrome.storage.sync.get
  let savedUserLanguage = null

  //INFO caso ainda sem linguagem definida, pega do navegador
  if (!savedUserLanguage) {
    return 'en'
  } else {
    return savedUserLanguage
  }

}

const UserLanguageTo = () => {

  //TODO coletar isso via chrome.storage.sync.get
  let savedUserLanguage = 'pt'

  //INFO caso ainda sem linguagem definida, pega do navegador
  if (!savedUserLanguage) {
    return (navigator.language || navigator.userLanguage).split('-')[0];
  } else {
    return savedUserLanguage
  }

}

//INFO identifica a tradução no arquivo de locales
const FindTranslation = (jsonData, originLanguage, targetLanguage, valuesToSearch) => {

  if (jsonData.length === 0 || valuesToSearch.length == 0) {
    return { state: false };
  }

  for (let i = 0; i < jsonData.length; i++) {
    for (let j = 0; j < valuesToSearch.length; j++) {

      const obj = jsonData[i];
      const val = valuesToSearch[j];
      const exists = Object.prototype.hasOwnProperty.call(obj, targetLanguage)
      const confirmed = val && obj[originLanguage] === val

      if (exists && confirmed) {

        return { state: true, origin: val, translation: obj[targetLanguage] };

      }
    }
  }

  return { state: false };

}

const Translate = (request, sender, sendResponse) => {

  const valuesToSearch = [request.data.text, request.data.tooltip]
  const result = FindTranslation(jsonLocales, UserLanguageFrom(), UserLanguageTo(), valuesToSearch)
  return result;

}
