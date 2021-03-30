var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        let recupStorage= JSON.parse(window.localStorage.getItem("panier"));

        let index = 0;
        let prixTotal=0;
        while (index<recupStorage.length) {
            const commande =document.querySelector('.commande');
            let teddysCommande = document.createElement("div");
            teddysCommande.classList.add("card","border","border-success","m-1","text-center");
            commande.appendChild(teddysCommande);

            let name = document.createElement("p");
            name.classList.add("col","font-weight-bold");
            name.innerHTML= recupStorage[index].nom
            teddysCommande.appendChild(name);
    
            let prix = document.querySelector('.prix')
            let price = document.createElement("p");
            price.classList.add("col","font-weight-bold");
            price.innerHTML="Prix :"+" "+ recupStorage[index].prix
            teddysCommande.appendChild(price);
    
            let nombre = document.querySelector('.nombre');
            let number = document.createElement("p");
            number.innerHTML="Article(s) :"+" "+ recupStorage[index].quantity
            number.classList.add("col","font-weight-bold");
            teddysCommande.appendChild(number);
            prixTotal = prixTotal + recupStorage[index].prix*recupStorage[index].quantity;
            console.log(prixTotal);

            let remove = document.createElement("BUTTON");
            remove.innerHTML="Retirer cette article";
            remove.classList="w-50"
            teddysCommande.appendChild(remove);
            remove.addEventListener('click',() =>{
            })
            index++;
        }
        let total = document.querySelector('.totalPrice');
        total.classList.add("col","font-weight-bold");
        total.innerHTML="Prix Totale :"+" "+ prixTotal;
    };
  
}
request.open("GET", "http://localhost:3000/api/teddies");
request.send();
