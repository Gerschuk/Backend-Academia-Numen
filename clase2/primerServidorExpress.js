// Requiero al módulo y llamo la función guardandolo en la constante app
const express = require("express");
const app = express();

// Creo los métodos que tendrá el server
app.get("/", (request, response) => {
    response.send("Bienvenidos a mi primer servidor con express");
});

app.get("/primer-servidor", (request, response) => {
    response.send("Primer server :)");
});

app.get("/static-file", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
// Pongo el servidor escuchando al puerto 8080
app.listen(8080, () => {
    console.log("Servidor funcionando en el puerto 8080");
})