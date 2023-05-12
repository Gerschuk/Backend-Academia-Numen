const http = require('http');

//Para trabajar con fileSistem
const fs = require("fs/promises");

// Creo el servidor
const server = http.createServer(async (request, response) => {
    if (request.url === "/") {
        response.write("Hola");
        response.end();
    }
    // Leo el archivo saludo.txt
    if (request.url === "/hello") {
        const saludo = await fs.readFile("./saludo.txt", "utf-8");
        response.write(saludo);
        response.end();
    }

    // Sobreescribo el archivo saludo.txt
    if (request.url === "/sobreescribir") {
        await fs.writeFile("./saludo.txt", "Sobreescribiendo el archivo saludo.txt");
        response.write("El archivo saludo.txt fue sobreescrito");
        response.end();
    }

    // Agrego contenido a un archivo existente o creo un nuevo archivo si no existe el nombre de archivo correspondiente
    if (request.url === "/agregar-contenido") {
        await fs.appendFile("./saludo.txt", "\n Nueva linea agregada");
        response.write("Se agrego la nueva linea al archivo saludo.txt");
        response.end();
    }

    // Creo un nuevo archivo ya que el mismo pasado por parametro a appendFile no existe
    if (request === "/nuevo-archivo") {
        await fs.appendFile("/nuevo-archivo.txt", "Iniciando nuevo archivo");
        response.write("Creando el nuevo archivo");
        response.end();
    }

    // Eliminando un archivo
    if (request === "/borrar") {
        await fs.unlink("./nuevo-archivo.txt");
        response.write("El archivo 'nuevo-archivo.txt' fue eliminado");
        response.end();
    }

    // Creando una carpeta
    if (request === "/folder") {
        await fs.mkdir("folder");
        response.write("Se creo la carpeta");
        response.end();
    }

    // Manejando errores
    if (request.url === "/hello-error") {
       try {
           const saludo = fs.readFile("./saludo.txt", "utf-8");
           response.write(saludo);
           response.end();
       } catch (error) {
           console.log("El error es: ", error);
           response.write("No se pudo leer el saludo");
           response.end();
       }
    }
});

server.listen(8080);

console.log("Server listening on port 8080");
