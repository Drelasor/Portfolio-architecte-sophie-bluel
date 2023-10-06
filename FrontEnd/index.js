document.addEventListener('DOMContentLoaded', async function () {
    try {  
        const galleryDiv = document.getElementById('gallery');
        const response = await fetch('http://localhost:5678/api/works');
    
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const works = await response.json();

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
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
});