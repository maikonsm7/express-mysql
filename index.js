const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000

const app = express()

app.use(express.static('public'))

//configuração handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    const nome = 'Maikon'
    const auth = true
    res.render('home', {nome, auth})
})

app.get('/dashboard', (req, res) => {
    const numeros = [1, 2, 3]
    res.render('dashboard', {numeros})
})

app.get('/posts', (req, res) => {
    const posts = [
        {title: 'React', category: 'Developer'},
        {title: 'BootStrap', category: 'Framework'},
        {title: 'NodeJS', category: 'Backend'}
    ]
    res.render('posts', {posts})
})

app.listen(port, () => {
    console.log(`Servidor online. http://localhost:${port}`)
})