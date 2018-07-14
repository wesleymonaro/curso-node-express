// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017', (err, db) => {
//     const treinaWebDB = db.db('treinaweb')
//     treinaWebDB.collection('cursos').find().sort({ nome: 1 }).toArray((err, result) => {
//         console.log(result)
//     })
// })

// parte 1
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/treinaweb');

// parte 2
var db = mongoose.connection;
db.on('error', () => console.log('erro de conexão'));

// parte 3
var cursoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    categoria: {
        type: String
    }
})

// parte 4
var Curso = mongoose.model('Curso', cursoSchema, 'cursos');

var novoCurso = new Curso({
    nome: "React",
    categoria: "Front End"
})


// parte 5
novoCurso.save((err, res) => {
    console.log(err, res);
})

// parte 6
Curso.find({}, [], { sort: { nome: 1 } }, (err, res) => {
    console.log(res)
})