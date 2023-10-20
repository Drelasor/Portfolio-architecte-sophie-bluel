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

  const buttons = [];
  console.log(works);

  //creation boutons
  for (let categorie of categories) {
    const button = document.createElement("button");
    button.id = categorie.id;
    button.innerHTML = categorie.name;
    buttonDiv.appendChild(button);
    buttons.push(button);
  }

  buttons[0].addEventListener("click", () => {
    let filter = works.filter((work) => work.category.id == buttons[0].id);
    displayWorks(filter);
  });

  buttons[1].addEventListener("click", () => {
    let filter = works.filter((work) => work.category.id == buttons[1].id);
    displayWorks(filter);
  });

  buttons[2].addEventListener("click", () => {
    let filter = works.filter((work) => work.category.id == buttons[2].id);
    displayWorks(filter);
  });
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
