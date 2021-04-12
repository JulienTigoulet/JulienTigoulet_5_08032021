const id= JSON.parse(window.localStorage.getItem("idOrder"));

const ValidationText=() =>{
    let container = document.querySelector('.containerValidation')
    let validate = document.querySelector('.textValidation')
    validate.innerHTML="Merci pour votre commande"+" "+id.contact.firstName+", "+id.contact.lastName+" "+
    "votre numéro de commande est le :"+" "+id.orderId+" "+ "Merci d'avoir commandé chez Orinoco !"
    container.appendChild(validate)
    setTimeout(()=>{
        localStorage.clear()
    },1000);  
}
ValidationText()
