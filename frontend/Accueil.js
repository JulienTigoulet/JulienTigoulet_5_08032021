
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);

        // création cardContainer
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("container");
        document.body.appendChild(cardContainer);
        // création rowContainer
        let cardRow = document.createElement("div");
        cardRow.classList.add("row");
        cardContainer.appendChild(cardRow);
        // création footer
        let footer = document.createElement("footer");
        footer.innerHTML="Bientôt en rupture de stock";
        footer.classList.add("container-fluid","text-center","bg-success","h1","p-4","text-white");
        document.body.appendChild(footer);

        // Boucle API CARD ****************************************************
        let index = 0;
        while (index<response.length){

            let card = document.createElement("div");
            card.classList.add("teddy",[index],"card","col-lg-2","col-md-3","m-2", "border-0");
            cardRow.appendChild(card);

            let imgBlock = document.createElement("div");
            imgBlock.style.height = "100%";
            imgBlock.style.overflow = "hidden";
            imgBlock.classList.add("border","border-success","rounded");
            card.appendChild(imgBlock);

            let img =document.createElement("img");
            img.setAttribute ('src',response[index].imageUrl);
            img.setAttribute ('alt',"ours en peluche");
            img.style.width = "100%";
            imgBlock.appendChild(img);

            let name =document.createElement("p");
            name.innerHTML= "Nom : " + response[index].name;
            card.appendChild(name);

            let price =document.createElement("p");
            price.innerHTML= "Prix : " + response[index].price;
            price.classList.add("font-weight-bold")
            card.appendChild(price);

            let description =document.createElement("p");
            description.innerHTML="Description : " + response[index].description;
            card.appendChild(description);

            let btn =document.createElement("BUTTON");
            btn.classList.add("btn","btn-success");
            btn.setAttribute("type", "button");
            btn.innerHTML="Commander !";
            card.appendChild(btn);
            index++;   
        }
    }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();

