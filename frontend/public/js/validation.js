const id= JSON.parse(window.localStorage.getItem("idOrder"));

const ValidationText=() =>{

    let validate = document.querySelector('.alertSuccess');
    validate.innerHTML=`<p>Merci pour votre commande ${id.contact.firstName} ${id.contact.lastName}</p>
    <p>Votre numéro de commande est le :</p>
    <p>${id.orderId}</p>
    <p>Merci d'avoir commandé chez Orinoco <i class="fas fa-paw"></p>`

    // localStorage.clear()
}
ValidationText()
