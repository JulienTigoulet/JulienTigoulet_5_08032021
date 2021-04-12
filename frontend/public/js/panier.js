    // récupération localstorage
    let recupStorage= JSON.parse(window.localStorage.getItem("panier"));

    // alert panier vide
    const emptyBasket = ()=>{
        if (recupStorage == null) {
            alert("Vous n'avez aucun article dans votre panier")
            location.replace("index.html");
        }
    }
    emptyBasket()
    // Value basket 
    let index = 0;
    let prixTotal=0;
    let products = [];
    let quantity = recupStorage[index].quantity;

    // Boucle création panier ->recupStorage et response
    while (index<recupStorage.length) {
        let id = recupStorage[index].id
        const commande =document.querySelector('.commande');
        let teddysCommande = document.createElement("div");
        teddysCommande.classList.add("card","col-lg-2","col-md-3","m-2","shadow")
        get("http://localhost:3000/api/teddies/" +id).then((response)=> {
            //création du nom par article
            let name = document.createElement("p");
            name.classList.add("font-weight-bold");
            name.innerHTML= response.name
            teddysCommande.appendChild(name);
            //création de la photo par article
            let img = document.createElement("img");
            img.classList.add("w-50")
            img.setAttribute ('src',response.imageUrl);
            img.setAttribute ('alt',"ours en peluche");
            teddysCommande.appendChild(img);
            // création du prix par article
            let price = document.createElement("p");
            price.classList.add("font-weight-bold", "prix");
            price.innerHTML="Prix :"+" "+ response.price/100+"€";
            price.setAttribute("id","prix")
            teddysCommande.appendChild(price);
            prixTotal= prixTotal + response.price*quantity;
            // Calcul du prix total
            let total = document.querySelector('.totalPrice');
            total.classList.add("font-weight-bold");
            total.innerHTML="Prix Total :"+" "+ prixTotal/100+"€";
        });
        teddysCommande.classList.add("card","border","border-success","m-1","align-items-center");
        commande.appendChild(teddysCommande);
        // création de la quantité par article
        let number = document.createElement("p");
        number.innerHTML="Article(s) :"+" "+ recupStorage[index].quantity
        number.classList.add("font-weight-bold");
        teddysCommande.appendChild(number);
        products.push(recupStorage[index].id)
        index++;
    }
    // reset panier , annuler commande
    let annuler = document.querySelector('.cancel');
    annuler.addEventListener('click', () => {
    location.replace("index.html");
    localStorage.clear();
    });
    // validation formulaire
    let formulaire = document.querySelector(".btnPasserCommande");
    formulaire.addEventListener('click',verifValidation)
    function verifValidation(event) {
        // Vérification de la validété du nom puis email puis adresse puis ville puis prénom
        if (document.formulaire.nom.validity.valueMissing){
            alert("Merci de remplir votre nom")   
        }else if (document.formulaire.email.validity.valueMissing) {
            event.preventDefault();
            alert("Merci de remplir votre email")
        }else if (document.formulaire.adresse.validity.valueMissing) {
            event.preventDefault();
            alert("Merci de remplir votre adresse")
        }
        else if (document.formulaire.ville.validity.valueMissing) {
            event.preventDefault();
            alert("Merci de remplir votre ville")
        }else if (document.formulaire.prenom.validity.valueMissing) {
            event.preventDefault();
            alert("Merci de remplir le prénom")
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
            .then(response => localStorage.setItem("idOrder", JSON.stringify(response)))
            setTimeout(()=>{
                window.location.replace("validation.html")
            },1000);
        }   
    }
 