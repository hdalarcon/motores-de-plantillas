const express = require('express')
const handlebars = require('express-handlebars')
const Contenedor = require('./conatiners/productos')

const contenedor = new Contenedor()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");



app.post('/productos', (req, res) => {
    const producto = req.body
    contenedor.save(producto)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    const prods = contenedor.getAll()

    res.render("productos", {
        productos: prods,
        hayProductos: prods.length
    });
});

//Running server

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
