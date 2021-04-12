// récupération de l'api request.js
get("http://localhost:3000/api/teddies").then((response) =>{
        // création cardRow --> Rangement des card
        const cardRow = document.querySelector('.creationCarte')
        // création boucle API teddies
        let index = 0;
        // boucle sur la lenght de l'api, créer chaque card
        while (index<response.length){

            let card = document.createElement("div");
            card.classList.add("teddy",[index],"card","col-lg-2","col-md-3","m-2", "border-0");
            cardRow.appendChild(card);

            let imgBlock = document.createElement("div");
            imgBlock.style.height = "100%";
            imgBlock.style.overflow = "hidden";
            imgBlock.classList.add("border","border-success","rounded","shadow");
            card.appendChild(imgBlock);

            let img =document.createElement("img");
            img.setAttribute ('src',response[index].imageUrl);
            img.setAttribute ('alt',"ours en peluche");
            img.style.width = "100%";
            imgBlock.appendChild(img);

            let name =document.createElement("p");
            name.innerHTML = response[index].name;
            name.classList.add("mt-1","font-weight-bold");
            card.appendChild(name);

            let price =document.createElement("p");
            price.innerHTML = "Prix : " + response[index].price/100+"€";;
            price.classList.add("font-weight-bold")
            card.appendChild(price);

            let description =document.createElement("p");
            description.innerHTML = response[index].description;
            card.appendChild(description);

            let aCommander = document.createElement("a");
            aCommander.setAttribute("href","commander.html?id="+ response[index]._id);
            aCommander.classList.add("d-flex","justify-content-center")
            card.appendChild(aCommander);

            let btnCommander =document.createElement("BUTTON");
            btnCommander.classList.add("btn","btnCommander","btn-success","btnCommander","border","border-dark","shadow");
            btnCommander.setAttribute("type", "button");
            btnCommander.innerHTML = "Commander ";
            aCommander.appendChild(btnCommander);
            index++;   
        }
    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
