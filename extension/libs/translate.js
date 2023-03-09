// eslint-disable-next-line no-redeclare
const Translate = {
  
  locales: {},

  LoadLocates: () => {

    fetch('/locales.json')
      .then(response => response.json())
      .then(data => {
        Translate.locales = data
      })
      .catch(error => { });
      
  },

  UserLanguageFrom: () => {

    //TODO coletar isso via chrome.storage.sync.get
    let savedUserLanguage = null

    //INFO caso ainda sem linguagem definida, pega do navegador
    if (!savedUserLanguage) {
      return 'en'
    } else {
      return savedUserLanguage
    }

  },

  UserLanguageTo: () => {

    //TODO coletar isso via chrome.storage.sync.get
    let savedUserLanguage = 'pt'

    //INFO caso ainda sem linguagem definida, pega do navegador
    if (!savedUserLanguage) {
      return (navigator.language || navigator.userLanguage).split('-')[0];
    } else {
      return savedUserLanguage
    }

  },

  FindTranslation: (jsonData, originLanguage, targetLanguage, valuesToSearch) => {

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

  },

  Execute: (request) => {

    const valuesToSearch = [request.data.text, request.data.tooltip]
    const result = Translate.FindTranslation(
      Translate.locales,
      Translate.UserLanguageFrom(),
      Translate.UserLanguageTo(),
      valuesToSearch)
    return result;

  }

}; 
