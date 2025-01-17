const galleryDiv = document.getElementById("gallery");
const galleryModalDiv = document.getElementById("gallery-modal");
const modify = document.getElementById("modify");
const login = document.getElementById("login-nav");
const logout = document.getElementById("logout-nav");
const editor = document.getElementById("editor-mod");
const buttonDiv = document.getElementById("filter-buttons");

function user(){
  console.log("user")
  if (localStorage.getItem('token')) {
    modify.style.display = "block";
    editor.style.display = "flex";
    logout.style.display = "block"; 
    login.style.display = "none"; 
    buttonDiv.style.display = "none";
    document.body.style.marginTop = "90px";
  
  
  } else {
    modify.style.display = "none";
    editor.style.display = "none";
    logout.style.display = "none"; 
    login.style.display = "block"; 
    buttonDiv.style.display = "flex";
    document.body.style.marginTop = "";
    
  }

  logout.addEventListener('click', (e) =>{
    e.preventDefault();
    localStorage.removeItem('token');
    user();
  })
  }

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
    deleteIcon.classList.add('custom-size');
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
      const worksData =  await initWorks();
      displayWorks(worksData);
      displayWorksModal(worksData);
    })
  });
}

async function initWorks(){
  //récuperation travaux 
    try{
      const response = await fetch("http://localhost:5678/api/works");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const works = await response.json();
      return works
    }catch (error) {
      console.error("Une erreur est survenue :", error);
    }
  }
 

async function filter() {
  //récuperation categories
  const categoriesResponse = await fetch("http://localhost:5678/api/categories");

  if (!categoriesResponse.ok) {
    throw new Error(response.statusText);
  }
  const categories = await categoriesResponse.json();
  

  // filtre bouton et affichage

  for (let categorie of [{id:-1, name:"Tous"},...categories]) {
    const button = document.createElement("button");
    button.innerHTML = categorie.name;
    buttonDiv.appendChild(button);
 

  button.addEventListener('click', async () => {
    // mise à jour réponse works nécessaire =>
    const worksData =  await initWorks();
    displayWorks(
      categorie.id === -1 ? worksData : worksData.filter((work) => work.category.id === categorie.id)
    )
  }
  )}
} 

 async function modal(){
  const deleteDiv = document.getElementById("delete");
  const addDiv = document.getElementById ("add");
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

    if (!title || !image || !category) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;  
    }

    try {
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
        imgInput.value= ""
        uploadDiv.style.display = "flex";
        boxImg.style.display = "none";

        alert("le travail est publié !")

        // Réinitialiser l'affichage des œuvres
        const worksData =  await initWorks();
        displayWorks(worksData);
        displayWorksModal(worksData);

    } catch (error) {
      console.error("Une erreur est survenue :", error);
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
    user();
    const worksData =  await initWorks();
    displayWorks(worksData);
    displayWorksModal(worksData);
    filter();
    modal();
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
});

