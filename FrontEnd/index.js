const galleryDiv = document.getElementById("gallery");
const galleryModalDiv = document.getElementById("gallery-modal");


function displayWorks(works) {
  galleryDiv.innerHTML = "";
  
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.innerText = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    galleryDiv.appendChild(figure);
  });
}

function displayWorksModal(works) {
  galleryModalDiv.innerHTML = "";
  
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const deleteIcon = document.createElement("i");
    const backIcon = document.createElement("div")

    backIcon.id = "background-icon"
    deleteIcon.classList = "fa-solid fa-trash-can";
    deleteIcon.style.color = "#ffffff";
    img.src = work.imageUrl;
    img.alt = work.title;

    figure.appendChild(img);
    figure.appendChild(backIcon);
    backIcon.appendChild(deleteIcon);
    galleryModalDiv.appendChild(figure);


    deleteIcon.addEventListener('click', async (e)=>{
      e.preventDefault();

      try{
        await fetch(`http://localhost:5678/api/works/${work.id}`, {
          method: "DELETE",
          headers:{
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      }catch(error){
        alert("erreur lors de la requête")
      }
      initWorks();
    })
  });
}

async function initWorks(){
  //récuperation travaux 
  const response = await fetch("http://localhost:5678/api/works");
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const works = await response.json();

  displayWorks(works);
  displayWorksModal(works);
  
}

async function filter() {
   //récuperation travaux 
   const response = await fetch("http://localhost:5678/api/works");
   if (!response.ok) {
     throw new Error(response.statusText);
   }
   const works = await response.json();
  //récuperation categories
  const categoriesResponse = await fetch("http://localhost:5678/api/categories");

  if (!categoriesResponse.ok) {
    throw new Error(response.statusText);
  }
  const categories = await categoriesResponse.json();
  const buttonDiv = document.getElementById("filter-buttons");
  

  // filtre bouton et affichage

  for (let categorie of [{id:-1, name:"Tous"},...categories]) {
    const button = document.createElement("button");
    button.innerHTML = categorie.name;
    buttonDiv.appendChild(button);
 

  button.addEventListener('click', () => {
    displayWorks(
      categorie.id === -1 ? works : works.filter((work) => work.category.id === categorie.id)
    )
  }
  )}
} 

 async function modal(){

  const modify = document.getElementById("modify")
  const deleteDiv = document.getElementById("delete");
  const addDiv = document.getElementById ("add")
  const overlay = document.getElementById("overlay");
  const addButton = document.getElementById("addwork");
  const exit = document.getElementsByClassName("exit");
  const back = document.getElementById("back");
  const addContentForm = document.getElementById("add-content-form");
  const imgInput = document.getElementById("fileInput");
  const imgPreview = document.getElementById("imgPreview");
  const uploadDiv = document.getElementById("upload");
  const boxImg = document.getElementById("container");
  const modals = document.getElementsByClassName("dialog");

// gestion ouverture/fermueture modal
  back.addEventListener('click',()=> {
    addDiv.style.display = "none"
    deleteDiv.style.display = "block"
  })

  modify.addEventListener('click', () => {
    deleteDiv.style.display = "block"
    overlay.style.display = "block"
  })

  addButton.addEventListener('click', () => {
    deleteDiv.style.display = "none"
    addDiv.style.display = "block"

  })

  for( let i = 0 ; i < exit.length; i++){
    exit[i].addEventListener ('click', () => {
      deleteDiv.style.display = "none"
      addDiv.style.display = "none"
      overlay.style.display = "none"
    })
  }

  // Requête publication travail
  document.getElementById("add-content-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const formData = new FormData(document.getElementById("add-content-form"));
    const title = formData.get('title');
    const image = formData.get('image');
    const category = formData.get('category');

    // Vérifier si les champs requis sont remplis
    if (!title || !image || !category) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;  // Bloquer l'envoi de la requête si le formulaire n'est pas rempli
    }

    try {
        // Envoyer la requête si le formulaire est rempli
        await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: formData,
        });

        // Réinitialiser le formulaire après l'envoi réussi
        document.getElementById("add-content-form").reset();
        document.getElementById("imgPreview").src = "";
        uploadDiv.style.display = "flex";
        boxImg.style.display = "none";
        
        alert("le travail est publié !")

        // Réinitialiser la liste des œuvres
        initWorks();
    } catch (error) {
        alert("Erreur lors de la requête");
    }
});

 imgInput.addEventListener("change", (e) =>{
  e.preventDefault();

  let file = imgInput.files[0];
  imgPreview.src = URL.createObjectURL(file);
  uploadDiv.style.display = "none";
  boxImg.style.display = "block";
 })
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    initWorks();
    filter();
    modal();
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
});

