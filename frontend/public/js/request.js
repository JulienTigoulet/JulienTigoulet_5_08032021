const get = (url) =>{
    return new Promise((resolve,reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }
        }
        request.open("GET",url);
        request.send();
    })
};