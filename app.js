import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("OK");
});

const carros = [
    {
        id: 1,
        marca: "Fiat",
        modelo: "Uno"
    },
    {
        id: 2,
        marca: "BMW",
        modelo: "Z4"
    },
    {
        id: 3,
        marca: "Honda",
        modelo: "Fit"
    },
]

function buscaCarro(id){
    return carros.findIndex(carros =>{
        return carros.id === Number(id);
    })
}

app.post("/carros", (req, res) => {
    carros.push(req.body);
    res.status(201).send("Cadastrado com sucesso");
});

app.get("/carros", (req, res) => {
    res.status(200).json(carros);
});

app.get("/carros/:id", (req, res) => {
    const id = buscaCarro(req.params.id);
    res.status(200).json(carros[id]);
});

app.put("/carros/:id", (req, res) => {
    const id = buscaCarro(req.params.id);
    carros[id].marca = req.body.marca;
    carros[id].modelo = req.body.modelo;
    res.status(200).json(carros[id]);
});

app.delete("/carros/:id", (req, res) => {
    const id = buscaCarro(req.params.id);
    console.log(id);
    if(carros[id]){
        carros.splice(id, 1);
        res.status(200).send("Removido com sucesso");
    } else {
        res.status(200).send("Carro não encontrado");
    }
    
    
});


export default app;