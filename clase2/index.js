const { error } = require("console");
const express = require("express");
const app = express();
const fsPromises = require("fs/promises");
const { parse } = require("path");

// Middleware
app.use(express.json())

// Leer todos los Items
app.get("/objeto", async (req, res) => {
    const ObjectsPlainText = await fsPromises.readFile("./clase2/db/database.txt");
    const objectJson = JSON.parse(ObjectsPlainText);
    res.json(objectJson);
});

// Leer un item por id
app.get("/objeto/:idObjeto", async (req, res) => {
    const { idObjeto } = req.params;
    const objectPlainText = await fsPromises.readFile("./clase2/db/database.txt");
    const objectsJson = JSON.parse(objectPlainText);
    const searchObject = objectsJson.find(objectJson => objectJson.id === Number(idObjeto));

    searchObject ? res.json(searchObject) : res.status(404).json({ message: "Objeto no encontrado" });
})

// Agregar un nuevo objeto
app.post("/objeto", async (req, res) => {
    const objectBody = req.body;
    const objectPlainText = await fsPromises.readFile("./clase2/db/database.txt");
    const objectsJson = JSON.parse(objectPlainText);
    const lastObject = objectsJson.at(-1)
    const maxId = lastObject.id + 1;
    objectBody.id = maxId;
    objectsJson.push(objectBody);
    const objectJsonToString = JSON.stringify(objectsJson);
    fsPromises.writeFile("./clase2/db/database.txt", objectJsonToString);
    res.json({message: "Se agregó el objeto a la lista."})
})

// Actualizar un objeto existente
app.put("/objeto/:id", async (req, res) => {
    const { id } = req.params;
    const {name} = req.body;
    const localObjects = JSON.parse(await fsPromises.readFile("./clase2/db/database.txt"));
    for (let i = 0; i < localObjects.length; i++) {
        if (localObjects[i].id === parseInt(id)) {
            localObjects[i].name = name;
        }
    }
    fsPromises.writeFile("./clase2/db/database.txt", JSON.stringify(localObjects));
    res.json({message: `El objeto con id: ${id} se modificó con exito`})
    
})

// Eliminar un objeto existente
app.delete("/objeto/:id", async (req, res) => {
    const { id } = req.params;
    const localObjects = JSON.parse(await fsPromises.readFile("./clase2/db/database.txt"));
    try {
        if (localObjects.find(object => object.id === parseInt(id)) ) {
            const updatedObjects = localObjects.filter(object => object.id !== parseInt(id))
            fsPromises.writeFile("./clase2/db/database.txt", JSON.stringify(updatedObjects));
            res.json({message: `El objeto con id: ${id} fue eliminado satisfactoriamente`})
        } else {
            throw new Error("El objeto no existe")
        }
    } catch (e) {
        res.json({message: `${e}`})
    }
})

app.listen(8080, () => {
    console.log("Servidor levantado en puerto 8080");
})
