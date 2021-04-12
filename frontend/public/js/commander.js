// récupération de l'hyperlien index.html--> button commander
let params = new URLSearchParams(location.search);
const id =params.get('id');
// récupération de l'api --> request.js
get("http://localhost:3000/api/teddies/"+ id).then((response) =>{
    // création de la cardCommander
    const items = document.querySelector("div.row.items");
    const cardCommander = ()=>{
        let img =document.createElement("img");
        img.setAttribute ('src',response.imageUrl);
        img.setAttribute ('alt',"ours en peluche");
        img.classList.add("mb-3","h-25","shadow");
        img.style.width = "100%";
        items.appendChild(img);

        let name = document.createElement("p");
        name.classList.add("font-weight-bold","mr-4","m-2");
        name.innerHTML=response.name;
        items.appendChild(name);

        let price = document.createElement("p");
        price.classList.add("font-weight-bold","m-2");
        price.innerHTML="Prix : "+ response.price/100+"€";;
        items.appendChild(price);
    }
    cardCommander()

    //selection quantité, si plus ajoute en plus envoie --> localStorage
    const selectNombre = document.querySelector('select.selecteurColor');
    const btnCommander = document.querySelector('.btnCommander')
    btnCommander.addEventListener('click', () => {
        let verificationStorage = JSON.parse(localStorage.getItem("panier"));
        // Si storage vide création d'un storage
        if(verificationStorage == null)verificationStorage = [];
        let valeur = document.querySelector('#quantite').value
        let foundTeddy = false;
        // si l'id de la commande = a un id du storage, ajout de la quantité
        verificationStorage.map((teddys) => {
            if(teddys.id === response._id) {
                foundTeddy = true;
                let quant = parseInt(teddys.quantity) + parseInt(valeur);
                teddys.quantity = quant.toString();
            }
        });
        // Si aucun id correspondant dans le storage création d'un objet panier
        if(!foundTeddy) {
            let panier ={
                id : response._id,
                quantity : valeur,
            };
            verificationStorage.push(panier)
        }
        localStorage.setItem("panier", JSON.stringify(verificationStorage));
        // alert commande
        window.alert("Votre commande pour"+" "+ response.name +" " +"en" +" "+ valeur +" "+" exemplaire(s), a bien été ajouté à votre panier");
    })
    // function boucle quantité
    const boucleQuantity=()=>{
        let index = 1;
            while (index<6) {
                let selecteur = document.querySelector("select.selecteur");
                let quantite = document.createElement("option");
                quantite.innerHTML=[index];
                quantite.setAttribute("value",[index]);
                selecteur.appendChild(quantite);
                index++;
            }
    }
    boucleQuantity()
    // function boucle couleur 
    const boucleCouleur =()=>{
        let index = 0;
        let nombreDeCouleurs = response.colors;
            while (index<nombreDeCouleurs.length) {
                let select = document.querySelector('select.selecteurColor');
                let couleur = document.createElement("option");
                couleur.innerHTML=response.colors[index];
                couleur.setAttribute("value","response.color[index]");
                select.appendChild(couleur);
                index++;
            }
    }
    boucleCouleur()

});


