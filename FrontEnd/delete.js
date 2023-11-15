function fazDelete(url) {

    const req = new XMLHttpRequest();

    req.open('DELETE', url);

    req.addEventListener('load', function() {
        if (req.readyState === 4 && req.status === 204) {
            console.log("Sucesso na deleção!")
        } else {
            console.log("Request error");
        }
    });

    req.send();
}


function excluiCliente() {
    event.preventDefault();

    let codigoCliente = document.getElementById("codigoCliente").value;
    let url = "http://localhost:3000/clientes/" + codigoCliente; 

    fazDelete(url)

    window.location.href = "index.html";
}