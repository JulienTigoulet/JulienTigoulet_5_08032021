// récupération localstorage
let recuperationStorage= JSON.parse(window.localStorage.getItem("panier"));
// redirection-->index.html si aucun article est dans le panier
const emptyBasket = (recupStorage)=>{
    if (recupStorage == null) {
        location.replace("index.html");
    }
};
emptyBasket(recuperationStorage)
let prixTotal=0;
let products = [];
// Boucle creation toute les articles mis dans le panier
recuperationStorage.forEach(id => {
    get("http://localhost:3000/api/teddies/" +id.id).then((response)=> {
        displayProducts(response,id);
        calculDuPrixTotal(response,id);
        products.push(id.id);
    });
});
// reset panier = annuler commande
let cancel = document.querySelector('.cancel');
cancel.addEventListener('click', () => {
    location.replace("index.html");
    localStorage.clear();
});
// validation formulaire
let formulaire = document.querySelector(".btnPasserCommande");
formulaire.addEventListener('click',verificationValidationFormulaire);
// fonction des produits en html -->mon_panier.html
const displayProducts = (response,id)=>{
    const containerProducts = document.querySelector('.commande');
    containerProducts.innerHTML+=
        `
        <div class="card col-lg-3 col-md-4 m-2 shadow" style="width: 18rem;">
        <div style="overflow: hidden;max-height: 145px; width: 100%" class="rounded">
            <img src="${response.imageUrl}" style="width: 100%;" class="card-img-top" alt="${response.name}, un ours en Peluche">
        </div>
        <div class="card-body">
            <h5 class="card-title">${response.name}</h5>
            <h5 class="card-title">${response.price/100+"€"}</h5>
            <h5 class="card-title">Article(s) : ${id.quantity}</h5>
        </div>
        </div>
        `  
}
// function Calcul du prix total
const calculDuPrixTotal=(response,id)=>{
    prixTotal= prixTotal + response.price*id.quantity;
    let total = document.querySelector('.totalPrice');
    total.innerHTML="Prix Total :"+" "+ prixTotal/100+"€";
}
// function Verification des données rentré au formulaire de contact
function verificationValidationFormulaire(event) {
    let alertNom =document.querySelector('.alertNom');
    let alertPrenom =document.querySelector('.alertPrenom');
    let alertEmail =document.querySelector('.alertEmail ');
    let alertAdresse =document.querySelector('.alertAdresse');
    let alertVille =document.querySelector('.alertVille');
    if (nom.validity.valueMissing){
        alertNom.innerHTML="Merci de remplir votre nom"
        alertNom.classList.add("d-block")
    }else if (nom.validity.patternMismatch){
        alertNom.innerHTML="Erreur sur l'écriture"
        alertNom.classList.add("d-block")

    }else if (prenom.validity.valueMissing){
        alertNom.classList.remove("d-block")
        alertPrenom.innerHTML="Merci de remplir votre Prénom"
        alertPrenom.classList.add("d-block")
    }else if (prenom.validity.patternMismatch){
        alertPrenom.innerHTML="Erreur sur l'écriture"
        alertPrenom.classList.add("d-block")

    }else if (email.validity.valueMissing){
        alertPrenom.classList.remove("d-block")
        alertEmail.innerHTML="Merci de remplir votre Email"
        alertEmail.classList.add("d-block")
    }else if (email.validity.typeMismatch){
        alertEmail.innerHTML="Erreur sur l'écriture"
        alertEmail.classList.add("d-block")

    }else if (adresse.validity.valueMissing){
        alertEmail.classList.remove("d-block")
        alertAdresse.innerHTML="Merci de remplir votre Adresse"
        alertAdresse.classList.add("d-block")
    }else if (adresse.validity.patternMismatch){
        alertAdresse.innerHTML="Erreur sur l'écriture"
        alertAdresse.classList.add("d-block")
        
    }else if (ville.validity.valueMissing){
        alertAdresse.classList.remove("d-block")
        alertVille.innerHTML="Merci de remplir votre Ville"
        alertVille.classList.add("d-block")
    }else if (ville.validity.patternMismatch){
        alertVille.innerHTML="Erreur sur l'écriture"
        alertVille.classList.add("d-block")
    }
    // Tout valide création de l'object contact et envoie en local storage
    else{
        event.preventDefault();
        const contact ={
            firstName: document.getElementById('prenom').value,
            lastName: document.getElementById('nom').value,
            address: document.getElementById('adresse').value,
            city: document.getElementById('ville').value,
            email: document.getElementById('email').value,
        };
        // Post de contact(formulaire) et de product(id des teddies)
        fetch("http://localhost:3000/api/teddies/order",
            {
            method :"POST",
            body:JSON.stringify({contact,products}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                }
            })
        //function création local storage --> rediction page validation 
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("idOrder", JSON.stringify(response));
            window.location.replace("validation.html");
        })
    }   
};