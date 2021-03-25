        
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);

        let items = document.querySelector("div.row.items");

        let img =document.createElement("img");
        img.setAttribute ('src',response.imageUrl);
        img.setAttribute ('alt',"ours en peluche");
        img.classList.add("mb-3","h-50");
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

        let boutonCommande = document.querySelector("div.boutonCommande")
        let aCommander = document.createElement("a");
        aCommander.setAttribute("href","commander.html?id="+ response._id+"&quant="+response._id);
        boutonCommande.appendChild(aCommander);

        let btnCommander =document.createElement("BUTTON");
        btnCommander.classList.add("btn","btnCommander","btn-success","btnCommander");
        btnCommander.setAttribute("type", "button");
        btnCommander.innerHTML = "Commander !";
        aCommander.appendChild(btnCommander);

        let indexe = 1;
            while (indexe<6) {
                let selecteur = document.querySelector("select.selecteur");
                let quantite = document.createElement("option");
                quantite.innerHTML=[indexe];
                quantite.setAttribute("value",[indexe]);
                selecteur.appendChild(quantite);
                indexe++;
            }

        let index = 0;
        let nombreDeCouleurs = response.colors;
            while (index<nombreDeCouleurs.length) {
                let select = document.querySelector('select.selecteurColor');
                let couleur = document.createElement("option");
                couleur.innerHTML=response.colors[index];
                couleur.setAttribute("value","response.color[index]")
                select.appendChild(couleur);
                index++;
            }
            
                
};
}
let params = new URLSearchParams(location.search);
const url =params.get('id');
request.open("GET", "http://localhost:3000/api/teddies/" + url);
request.send();
