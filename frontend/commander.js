        
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        let items = document.querySelector("div.row.items");

        let img =document.createElement("img");
        img.setAttribute ('src',response.imageUrl);
        img.setAttribute ('alt',"ours en peluche");
        img.classList.add("mb-3","h-25","shadow");
        img.style.width = "100%";
        items.appendChild(img);

        let name = document.createElement("p");
        name.classList.add("col","font-weight-bold");
        name.innerHTML=response.name;
        items.appendChild(name);

        let price = document.createElement("p");
        price.classList.add("col","font-weight-bold");
        price.innerHTML="prix : "+ response.price;
        items.appendChild(price);

//selection quantité --> localStorage

        const selectNombre = document.querySelector('select.selecteurColor');
        const btnCommander = document.querySelector('.btnCommander')
        btnCommander.addEventListener('click', () => {
            let verificationStorage = JSON.parse(localStorage.getItem("panier"));
            if(verificationStorage == null)verificationStorage = [];
            let valeur = document.querySelector('#quantite').value
            let foundTeddy = false;
            verificationStorage.map((teddys) => {
                if(teddys.id === response._id) {
                    foundTeddy = true;
                    let quant = parseInt(teddys.quantity) + parseInt(valeur);
                    teddys.quantity = quant.toString();
                }
            });
            if(!foundTeddy) {
                let panier ={
                    nom : response.name,
                    id : response._id,
                    prix : response.price,
                    quantity : valeur,
                };
                verificationStorage.push(panier)
            }
            localStorage.setItem("panier", JSON.stringify(verificationStorage));
            window.alert("Votre commande pour"+" "+ response.name +" " +"en" +" "+ valeur +" "+" exemplaire(s), a bien été ajouté à votre panier");
        })
// boucle quantité
        let indexe = 1;
            while (indexe<6) {
                let selecteur = document.querySelector("select.selecteur");
                let quantite = document.createElement("option");
                quantite.innerHTML=[indexe];
                quantite.setAttribute("value",[indexe]);
                selecteur.appendChild(quantite);
                indexe++;
            }
// boucle couleur 
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

};
}
let params = new URLSearchParams(location.search);
const url =params.get('id');
request.open("GET", "http://localhost:3000/api/teddies/" + url);
request.send();
