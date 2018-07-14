var express = require('express');
var bodyParser = require('body-parser');
var namespace = require('express-namespace');

var app = express();

function myMiddleware(req, res, next) {
    req.body.message = "Intercepted by middleware";
    next();
}

app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(myMiddleware);

app.get('/', (req, res) => { res.send('Hello World'); })

//USANDO NAMESPACES
// app.namespace('/alunos', () => {
//     app.get('/', () => { })
//     app.get('/:id', () => { })
//     app.post('/create', () => { })
//     app.put('/update/:id', () => { })
// })

app.get('/alunos', (req, res) => {
    var alunos = [
        { nome: 'Wesley' },
        { nome: 'Sheila' },
        { nome: 'Andrey' },
    ]

    res.render('alunos', { titulo: 'TreinaWeb', alunos })
})

// USANDO REGEX
// app.get(/teste?/, (req, res) => {
//     res.send('Hello World');
// })

// app.post('/teste', (req, res) => {
//     var myJson = req.body;
//     myJson.newData = 'TreinaWeb';
//     res.send(myJson);
// });

app.post('/teste', (req, res) => {
    var myJson = req.body;
    res.format({
        'text': () => {
            res.send('Just Text');
        },
        'json': () => {
            myJson.newData = 'TreinaWeb';
            res.send(myJson);
        }
    })
});

app.listen(app.get('port'));
console.log(`Server running on port ${app.get('port')}`)