// Récupération des différents localStorage
const identifiant= JSON.parse(window.localStorage.getItem("idOrder"));
let panier= JSON.parse(window.localStorage.getItem("panier"));

let prixTotal=0;
panier.forEach(id => {
    get("http://localhost:3000/api/teddies/" +id.id).then((response)=> {
        calculDuPrixTotal(id,response)
        userInformationDisplay()
    });
});
// calcul du prix total
const calculDuPrixTotal = (id,response)=>{
    prixTotal= prixTotal + response.price*id.quantity;
}
// Validation de la commande puis localstorage.clear
const userInformationDisplay=() =>{
    let validate = document.querySelector('.alertSuccess');
    validate.innerHTML=`<p>Merci pour votre commande ${identifiant.contact.firstName} ${identifiant.contact.lastName}</p>
    <p>Votre numéro de commande est le :</p>
    <p>${identifiant.orderId}</p>
    <p>Le prix total est de : ${prixTotal/100+"€"}</p>
    <p>Merci d'avoir commandé chez Orinoco <i class="fas fa-paw"></p>`
    localStorage.clear();
}
