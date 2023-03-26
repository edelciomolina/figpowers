


/*

TODO https://www.figma.com/api/trashed_files_v2?org_id=
TODO https://www.figma.com/api/active_file_users
TODO https://www.figma.com/api/community_shelves?shelf_type=file_browser_recommended_templates


*/
 
// INFO Interceptando /track !!!!!!!!!!!!!!!!!!!!!!! 
  
const originalXHR = window.XMLHttpRequest;
function newXHR() {
    const xhr = new originalXHR();
    xhr.addEventListener('load', function () {
        try {
            if (this.responseURL.includes('track')) {
                if (this.response) {
                    const data = JSON.parse(this.__sentry_xhr__.body)
                    const file_key = [
                        ...[data.properties.fileKey],
                        ...[data.properties.resourceId],
                        ...[data.properties.fileKeys]
                    ].filter(item => item !== undefined)
                    console.log(file_key, data)
                }
            }

        } catch (error) { /**/ }
    });
    return xhr;
}
window.XMLHttpRequest = newXHR;


//INFO Comprimir ou Expandir Project Teams
// Selecionar todos os elementos que começam com a classe "nav_section--section"
const sections = document.querySelectorAll('[class^="nav_section--section"]');

// Adicionar um listener de eventos em cada seção
sections.forEach(section => {
  // Encontrar todos os elementos dentro da seção que começam com a classe "nav_section--orderedFolders"
  const orderedFolders = section.querySelectorAll('[class^="nav_section--orderedFolders"]');

  // Tornar visíveis todos os elementos encontrados
  orderedFolders.forEach(folder => {
    folder.style.display = 'block';
  });

  // Adicionar o listener de eventos
  section.addEventListener('click', event => {
    // Impedir a ação padrão do evento (neste caso, evitar a navegação)
    event.preventDefault();

    // Alternar a exibição dos elementos
    orderedFolders.forEach(folder => {
      folder.style.display = folder.style.display === 'block' ? 'none' : 'block';
    });
  });
});
