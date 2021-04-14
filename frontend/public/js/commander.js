// récupération de l'hyperlien index.html--> button commander
let params = new URLSearchParams(location.search);
const id =params.get('id');
// récupération de l'api --> request.js
get("http://localhost:3000/api/teddies/"+ id).then((response) =>{
    // création de la cardCommander
    const btnCommander = document.querySelector('.btnCommander');
    cardCommander(response)
    const prixTeddies = document.querySelector('.quantite');
    //calcule du prix total pour un
    let prixUn = document.querySelector('.prixTotal')
    prixUn.textContent ="Prix total :"+' '+response.price/100+"€"
    // calcule du prix total en prenant en compte le select 
    prixTeddies.addEventListener('change', (event) => {
        const result = document.querySelector('.prixTotal');
        prixTotal=`${event.target.value*response.price/100+"€"}`
        result.textContent ="Prix total :"+' '+prixTotal 
    });
    // Au moment de l'ajout au panier
    btnCommander.addEventListener('click', () => {
        btnCommander.classList.add('d-none')
        let verificationStorage = JSON.parse(localStorage.getItem("panier"));
        // Si storage vide création d'un verificationStorage
        if(verificationStorage == null)verificationStorage = [];
        let valeur = document.querySelector('#quantite').value;
        let foundTeddy = false;
        // si l'id de la commande = id verificationStorage, ajout de la quantité en plus
        verificationStorage.map((teddys) => {
            if(teddys.id === response._id) {
                foundTeddy = true;
                let quant = parseInt(teddys.quantity) + parseInt(valeur);
                teddys.quantity = quant.toString();
            }
        });
        // Si aucun id correspondant dans le vérificationStorage création d'un objet panier
        if(!foundTeddy) {
            let panier ={
                id : response._id,
                quantity : valeur,
            };
            verificationStorage.push(panier);
        }
        localStorage.setItem("panier", JSON.stringify(verificationStorage));
        // alert commande bien effectué
        let alert = document.querySelector('.alert')
        alert.classList.add("d-block")
        alert.innerHTML =
        "Votre commande pour"+" "+ response.name +" " +"en" +" "+ valeur +" "+" exemplaire(s), a bien été ajouté à votre panier"
        let btnPanier=document.querySelector('.btnPanier')
        btnPanier.classList.remove("d-none")
    })
    // function boucle couleur
   response.colors.forEach(color => {
        let select = document.querySelector('.selecteurColor');
        let couleur = document.createElement("option");
        couleur.innerHTML=color;
        select.appendChild(couleur);
    }); 

});
// création de la card en html
const cardCommander = (response)=>{
    const containerCard = document.querySelector('.theCard')
    containerCard.innerHTML=
        `
        <div class="card text-center shadow" style="width: 300px;">
        <div style="overflow: hidden;" class="rounded">
            <img src="${response.imageUrl}" class="card-img-top" alt="${response.name}, un ours en Peluche">
        </div>
        <div class="card-body">
            <h5 class="card-title">${response.name}</h5>
            <h5 class="card-title">${response.price/100+"€"}</h5>
        </div>
        </div>
        `  
    }



