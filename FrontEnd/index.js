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

    deleteIcon.classList = "fa-solid fa-trash-can";
    img.src = work.imageUrl;
    img.alt = work.title;

    figure.appendChild(img);
    figure.appendChild(deleteIcon);
    galleryModalDiv.appendChild(figure);
  });
}


async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const categoriesResponse = await fetch(
    "http://localhost:5678/api/categories"
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const works = await response.json();

  const categories = await categoriesResponse.json();
  const buttonDiv = document.getElementById("filter-buttons");
  displayWorks(works);

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
  const response = await fetch("http://localhost:5678/api/works");
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  
  const works = await response.json();
  displayWorksModal(works);

  const modify = document.getElementById("modify")
  const deleteDiv = document.getElementById("delete");
  const addDiv = document.getElementById ("add")
  const overlay = document.getElementById("overlay");
  const addButton = document.getElementById("addwork");
  const exit = document.getElementsByClassName("exit");
  const back = document.getElementById("back");
  const addContentForm = document.getElementById("add-content-form")


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

  addContentForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    try{
      await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers:{
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: new FormData(addContentForm),
      });

    }catch(error){
      alert("erreur lors de la requête")
    }
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    getWorks();
    modal();
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
});

