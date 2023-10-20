
function displayWorks(works){
    const galleryDiv = document.getElementById('gallery');
    galleryDiv.innerHTML = ""

    works.forEach(work => {
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

async function getWorks(){
    const response = await fetch('http://localhost:5678/api/works');
    const categoriesResponse = await fetch('http://localhost:5678/api/categories');

    if (!response.ok) {
        throw new Error(response.statusText);
    }

        const works = await response.json();
        displayWorks(works)

        const buttonAll = document.getElementById('0');
        const buttonObject = document.getElementById('1');
        const buttonHome = document.getElementById('2');
        const buttonHotels = document.getElementById('3');

        function event(button){
            button.addEventListener('click', ()=>{
                let test = works.filter((work)=>work.category.id = button.id)
                displayWorks(test)
             } )

        }

        buttonObject.addEventListener('click', ()=>{
           let test = works.filter((work)=>work.category.id = buttonObject.id)
           displayWorks(test)
        } )
    }

async function categories(){
        const categoriesResponse = await fetch('http://localhost:5678/api/categories');

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const categories = await categoriesResponse.json();
        const filterButtons = document.getElementById('filter-buttons');

        function createButton(buttonName, buttonId){
            const button = document.createElement("button")
            button.innerText = buttonName
            button.id = buttonId
            filterButtons.appendChild(button)
            }

            createButton("Tous",0)
        
        for (const categorie of categories){
            createButton(categorie.name, categorie.id)
        }
         
    }

   


document.addEventListener('DOMContentLoaded', async function () {
    try {  
       

     

           
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
});

/*Je recrupere */