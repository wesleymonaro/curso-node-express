var express = require('express');
var bodyParser = require('body-parser');
var namespace = require('express-namespace');

var app = express();
const PORT = 3000;

function myMiddleware(req, res, next) {
    req.body.message = "Intercepted by middleware";
    next();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(myMiddleware);

app.get('/', (req, res) => { res.send('Hello World'); })

//USANDO NAMESPACES
app.namespace('/alunos', () => {
    app.get('/', () => { })
    app.get('/:id', () => { })
    app.post('/create', () => { })
    app.put('/update/:id', () => { })
})

app.get('/aluno/:id', (req, res) => {
    res.send('Aluno ' + req.params.id);
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

app.listen(PORT);
console.log(`Server running on port ${PORT}`)