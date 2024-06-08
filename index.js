const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')
const port = 3000

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

//configuração handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    const nome = 'Maikon'
    const auth = true
    res.render('home', { nome, auth })
})

app.get('/dashboard', (req, res) => {
    const numeros = [1, 2, 3]
    res.render('dashboard', { numeros })
})

app.get('/posts', (req, res) => {
    const posts = [
        { title: 'React', category: 'Developer' },
        { title: 'BootStrap', category: 'Framework' },
        { title: 'NodeJS', category: 'Backend' }
    ]
    res.render('posts', { posts })
})

app.get('/produtos', (req, res) => {
    const sql = `SELECT * FROM produto`
    pool.query(sql, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.render('produtos', { produtos: data })
        }
    })
})
// inserir produto
app.post('/produtos/inserir', (req, res) => {
    const nome = req.body.nome
    const preco = req.body.preco
    // preparando a query
    const sql = `INSERT INTO produto (??, ??) VALUES (?, ?)`
    const data = ['nome', 'preco', nome, preco]
    pool.query(sql, data, err => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/produtos')
        }
    })
})
// buscar produto
app.get('/produtos/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM produto WHERE idproduto = ${id}`
    pool.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        } 
        
        const produto = data[0] // sempre é retornado um array, mesmo que seja um elemento apenas
        res.render('produto', {produto})
    })
})

// editar produto
app.get('/produtos/editar/:id', (req, res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM produto WHERE idproduto = ${id}`
    pool.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        } 
        
        const produto = data[0]
        res.render('editarProduto', {produto})
    })
})

app.post('/produtos/editar', (req, res)=>{
    const id = req.body.id
    const nome = req.body.nome
    const preco = req.body.preco
    // preparando a query
    const sql = `UPDATE produto SET nome = '${nome}', preco = ${preco} WHERE idproduto = ${id}`
    pool.query(sql, err => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/produtos/' + id)
        }
    })
})
// remover produto
app.get('/produtos/remover/:id', (req, res)=>{
    const id = req.params.id
    const sql = `DELETE FROM produto WHERE idproduto = ${id}`
    pool.query(sql, err => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/produtos')
        }
    })
})

app.listen(port, () => {
    console.log(`Servidor online. http://localhost:${port}`)
})