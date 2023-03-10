
function openBoiteModale() {
    const Modale = document.getElementById('openModale');

    Modale.style.display = 'flex';
    Modale.setAttribute('aria-hidden', 'false');
    Modale.removeAttribute('aria-hidden');
    
    window.addEventListener('click', outsideClick);

    loadProjectsModale()
    createPage2Modale ()
}
    
function closeBoiteModale() {
    const Modale = document.getElementById('openModale');
    Modale.style.display = 'none';
    Modale.setAttribute('aria-hidden', 'true');
    
    window.removeEventListener('click', outsideClick);

    removeItemsModale ()
    closepage2Modale () 
}
    
function outsideClick(event) {
    const Modale = document.getElementById('openModale');
    if (event.target == Modale) {
        closeBoiteModale();
    }
}
    
document.addEventListener('DOMContentLoaded', function() {
    const openModaleLink = document.querySelector('.Lien-Open-Modale');
    const closeButtonLink = document.querySelector('.Close-Modale-1');
    
    openModaleLink.addEventListener('click', function(event) {
        event.preventDefault();
        openBoiteModale();
    });
    
    closeButtonLink.addEventListener('click', function(event) {
        event.preventDefault();
        closeBoiteModale();
    });
});


//Function Load Projects sur la modale
function loadProjectsModale() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
  
    if (userData) {

        async function loadProjects2() {
            let response = await fetch("http://localhost:5678/api/works");
        
            console.log(response.status); // 200
            console.log(response.statusText); // OK
        
            if (response.status === 200) {
                let works = await response.json();
                console.log(works);

                let divGalerieModale = document.querySelector('.galeriePhotoModale');
                let divImagesModale = document.createElement("div")
                divImagesModale.classList.add("Images-Modale");
                
                for(let i = 0; i < works.length; i++) {
        
                    let boxWork = works[i];
                    const workIdentification = works.map(projets => projets.id);
                    let WorkId = workIdentification[i];
                    let figureElement = document.createElement("figure");
                    figureElement.style.position = 'relative';
                    
                    let imageElement = document.createElement("img");
                    imageElement.src = works[i].imageUrl
                    imageElement.alt = works[i].title
                    imageElement.style.width = '100%'
                    imageElement.style.position = 'relative';

                    let editImage = document.createElement("figcaption");
                    editImage.innerText = '??diter'
                    editImage.href = '#'

                    let iconsDiv = document.createElement("div");
                    iconsDiv.classList.add("divIcon");
                    iconsDiv.style.position = 'absolute';

                    let arrowIcon = document.createElement("a");
                    arrowIcon.classList.add("ArrowIcon");
                    arrowIcon.innerHTML+= '<i class="fa-solid fa-arrows-up-down-left-right"></i>';

                    imageElement.addEventListener('mouseover', () => {
                        arrowIconClass = document.document.querySelector('.ArrowIcon');
                        arrowIconClass.style.display = 'block';
                    });
                    
                    let trashIcon = document.createElement("a");
                    trashIcon.innerHTML+= '<i class="fa-regular fa-trash-can"></i>';
                    trashIcon.addEventListener('click', function(e){
                        e.preventDefault();
                        figureElement.remove();
                    });

                    divImagesModale.appendChild(figureElement);
                    figureElement.appendChild(imageElement)
                    figureElement.appendChild(editImage);
                    figureElement.appendChild(iconsDiv);
                    iconsDiv.appendChild(arrowIcon);
                    iconsDiv.appendChild(trashIcon);
                
                }
                divGalerieModale.appendChild(divImagesModale);
            }
            else{ 
                console.log(error)
            }
        };
        
        loadProjects2();
    }
}

function removeItemsModale () {
    const divGalerieModale = document.querySelector('.galeriePhotoModale');
    divGalerieModale.innerHTML = "" ;
}


//fonction supprimer toute la galerie 
const publierChangements = document.getElementById('Boutton-Publier-Changements');
publierChangements.addEventListener('click',function(e){
    e.preventDefault()

    async function deleteProjectsConfirmed(){
        let response = await fetch('http://localhost:5678/api/works/${workId}',{
         method: "DELETE",
         headers: {
            "content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('userData')
        }},
        );

    }

})


//Fonction navigation Modale Page2
function createPage2Modale () {
    const page1Modale = document.querySelector('.Modale-Edit');
    const page2Modale = document.querySelector('.Modale-Add');
    const ajoutPhotoModale = document.querySelector('.Ajout-Button-Modale');

    ajoutPhotoModale.addEventListener('click', function (){
        page1Modale.style.display = 'none';
        page2Modale.style.display = 'block';
    })
}

//Fonction navigation exit Modale Page2
function closepage2Modale () {
    const page2Modale = document.querySelector('.Modale-Add');
    const page1Modale = document.querySelector('.Modale-Edit');
    page2Modale.style.display = 'none';
    page1Modale.style.display = 'block';

}

// Fonction pour revenir ?? la 1ere bo??te Modale
const backPage1Modale = document.querySelector('.fa-arrow-left-long')
backPage1Modale.addEventListener('click', function(event) {
    event.preventDefault();
    closepage2Modale ();
    removeItemsModale ();
    openBoiteModale();
});


//Fonction pour fermer la 2eme Bo??te Modale
const closeButton2Link = document.querySelector('.Close-Modale-2');
closeButton2Link.addEventListener('click', function(event) {
    event.preventDefault();
    closepage2Modale ();
    closeBoiteModale();
});
