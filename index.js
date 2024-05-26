const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000

const app = express()

//configuração handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Servidor online. http://localhost:${port}`)
})