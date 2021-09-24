const express = require('express')
const app = express()
const path = require('path')
const convert = require('./lib/convert')

app.set('view engine', 'ejs')

// tratamento de caminhos (barra normal, barra invertida, etc etc
app.set('views', path.join(__dirname, 'views'))

// local onde guardará os arquivos
app.use(express.static(path.join(__dirname, 'public')))

// renderiza a página inicial
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/cotacao', (req, res) => {
    console.log(req.query)
    const {cotacao, quantidade } = req.query
    if (cotacao && quantidade) {
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', {
            error: 'Valores Inválidos'
        })
    }
})


app.listen(3000, err => {
    if(err) {
        console.log('erro, não foi possível iniciar')
    } else {
        console.log('Convert My Money - Online')
    }
})