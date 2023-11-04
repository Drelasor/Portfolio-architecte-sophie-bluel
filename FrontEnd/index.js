function displayWorks(works) {
  const galleryDiv = document.getElementById("gallery");
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

  console.log(works);

  //creation boutons
  for (let categorie of [{id:-1, name:"tous"},...categories]) {
    const button = document.createElement("button");
    button.innerHTML = categorie.name;
    buttonDiv.appendChild(button);
 

  button.addEventListener('click', () => (
    displayWorks(
      categorie.id === -1 ? works : works.filter((work) => work.category.id === categorie.id)
    )
  ))
  }
} 

document.addEventListener("DOMContentLoaded", async function () {
  try {
    getWorks();
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
});

/*
création bouton
Addeventlistener

 */
