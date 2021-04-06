
    let recupStorage= JSON.parse(window.localStorage.getItem("panier"));

    // Boucle card panier  LocalStorage récupération
    let index = 0;
    let prixTotal=0;
    let product_id = [];
    
    get("http://localhost:3000/api/teddies").then((response)=>{

    while (index<recupStorage.length) {
        const commande =document.querySelector('.commande');
        let id = recupStorage[index].id
        get("http://localhost:3000/api/teddies/" +id).then(response);
        let teddysCommande = document.createElement("div");
        teddysCommande.classList.add("card","border","border-success","m-1","align-items-center");
        commande.appendChild(teddysCommande);
    
        let name = document.createElement("p");
        name.classList.add("col","font-weight-bold");
        name.innerHTML= response.name
        teddysCommande.appendChild(name);
    
        let prix = document.querySelector('.prix')
        let price = document.createElement("p");
        price.classList.add("col","font-weight-bold");
        price.innerHTML="Prix :"+" "+ response.price
        teddysCommande.appendChild(price);
    
        let nombre = document.querySelector('.nombre');
        let number = document.createElement("p");
        number.innerHTML="Article(s) :"+" "+ recupStorage[index].quantity
        number.classList.add("col","font-weight-bold");
        teddysCommande.appendChild(number);
        prixTotal = prixTotal + recupStorage[index].prix*recupStorage[index].quantity;
        product_id.push(recupStorage[index].id)
        index++;
    }
    // Calcul du prix total
    let total = document.querySelector('.totalPrice');
    total.classList.add("col","font-weight-bold");
    total.innerHTML="Prix Total :"+" "+ prixTotal;
    // reset panier
    let annuler = document.querySelector('.cancel');
    annuler.addEventListener('click', () => {
    location.replace("index.html");
    localStorage.clear();
    });
    // validation panier 
    let validation = document.querySelector('.validation');
    let contact=[]

    validation.addEventListener('click', ()=>{

    let firstName = document.getElementById('nom').value;
    let lastName = document.getElementById('prenom').value;
    let city = document.getElementById('ville').value;
    let adress = document.getElementById('adresse').value;
    let email= document.getElementById('email').value;
    contact.push(firstName,lastName,city,adress,email);
    });
});