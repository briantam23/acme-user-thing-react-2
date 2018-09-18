const db = require('./db');
const { User, Thing, UserThings } = db.models;
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`listening on PORT ${PORT}`));

app.use(require('body-parser').json());

app.use('/public', express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next)
})
app.get('/api/users/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(next)
})
app.post('/api/users', (req, res, next) => {
    User.create(req.body)
        .then(user => res.send(user))
        .catch(next)
})
app.put('/api/users/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.update(req.body))
        .then(user => res.send(user))
        .catch(next)
})
app.delete('/api/users/:id', (req, res, next) => {
    User.destroy({ where: {
        id: req.params.id
    }})
        .then(() => res.sendStatus(204))
        .catch(next)
})


db.syncAndSeed();