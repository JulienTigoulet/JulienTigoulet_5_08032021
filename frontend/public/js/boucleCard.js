// récupération de l'api request.js
get("http://localhost:3000/api/teddies").then((responses) =>{
    // Appel de toute les cards
    responses.forEach(response => {
        
        cardEntier(response)
    });
});
// création html+api de toute les cards
const cardEntier = (response)=>{
    const cardRow = document.querySelector('.creationCarte');
    cardRow.innerHTML+=
    `
    <div class="card col-lg-3 col-md-4 m-2 shadow" style="width: 18rem;">
    <div style="overflow: hidden;max-height: 145px; width: 100%" class="rounded">
        <img src="${response.imageUrl}" class="card-img-top" style="width: 100%; alt="${response.name}, un ours en Peluche">
    </div>
    <div class="card-body">
        <h5 class="card-title">${response.name}</h5>
        <h5 class="card-title">${response.price/100+"€"}</h5>
        <p class="card-text">${response.description}</p>
        <a href="commander.html?id=${response._id}" class="btn btn-primary">Voir l'article</a>
    </div>
    </div>
    `
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
