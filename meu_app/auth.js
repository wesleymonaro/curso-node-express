// parte 1

var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// parte 2

var users = [
    {
        id: 1,
        name: 'maria',
        password: 'maria123'
    },
    {
        id: 2,
        name: 'joao',
        password: 'joao123'
    }
]

// parte 3
var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrkey: 'minhaChaveSecreta'
}

// parte 4
var strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    var user = users.find(user => user.id === jwt_payload.id);

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use(strategy);

// parte 5
var app = express();
app.use(passport.initialize());
app.use(bodyParser.json());

// parte 6

app.post('/', (req, res) => {
    var name = req.body.name,
        password = req.body.password,
        user = users.find(user => user.name === name);

    if (user && (user.password === password)) {
        var payload = { id: user.id };
        var token = jwt.sign(payload, jwtOptions.secretOrkey);
        res.json({ message: 'ok', token })
    } else {
        res.status(401).json({ message: 'Não autorizado' })
    }
})

// parte 7
app.get('/', passport.authenticate('jwt', { session: false }, (req, res) => {
    res.json({ message: 'Sucesso! Voce acessou uma rota privada' })
}))

// parte 8
app.listen(3000, () => {
    console.log('running')
})