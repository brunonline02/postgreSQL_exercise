
import express from 'express';
const app = express();
import * as dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 5432;
import pkg from 'pg';
const { Pool } = pkg; 

const pool = new Pool ({
    user: process.env.USER_DATABASE,
    host: 'mouse.db.elephantsql.com',
    database: process.env.USER_DATABASE,
    password: process.env.DB_PASSWORD,
}) 

// GET  /  : To get all the users 
// app.get('/', (req, res) => {
//     pool
//     .query('SELECT * FROM users;')
//     .then(data => res.json(data))
//     .catch(e => res.sendStatus(500))
// });

// // GET  /:id :  To get one user (with the id) 
// app.get('/:id', (req, res) => {
//     const { id } = req.params;
//     pool
//     .query('SELECT * FROM users WHERE id=$1;', [id])
//     .then(data => res.json(data))
//     .catch(e => res.sendStatus(500))
// });

// // POST / -> To create a new user 
// app.post('/', (req, res) => {
//     const { name } = req.body;
//     pool
//     .query('INSERT INTO users(name) values($1) RETURNING *;', [name])
//     .then(data => res.status(201).json(data))
//     .catch(e => res.sendStatus(500))
// });

// // PUT /:id  :  To edit one user (with the id) 
// app.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     pool
//     .query('UPDATE users SET name=$1 WHERE id=$2 RETURNING *;', [name, id])
//     .then(data => res.status(201).json(data))
//     .catch(e => res.sendStatus(500))
// });

// // DELETE  /:id : To delete one user (with the id)
// app.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     pool
//     .query('DELETE users WHERE id=$1;', [id])
//     .then(data => res.status(201).json(data))
//     .catch(e => res.sendStatus(500))
// });

app.get('/orders', (req, res) => {
    pool
    .query('SELECT * FROM orders;')
    .then(data => res.json(data))
    .catch(e => res.sendStatus(500))
});

app.get('/orders/:id', (req, res) => {
    const { id } = req.params;
    pool
    .query('SELECT * FROM orders WHERE id=$1;', [id])
    .then(data => res.json(data))
    .catch(e => res.sendStatus(500))
});

// // POST / -> To create a new user 
app.post('/', (req, res) => {
    const { name } = req.body;
    pool
    .query('INSERT INTO users(name) values($1) RETURNING *;', [name])
    .then(data => res.status(201).json(data))
    .catch(e => res.sendStatus(500))
});

// // PUT /:id  :  To edit one user (with the id) 
app.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    pool
    .query('UPDATE users SET name=$1 WHERE id=$2 RETURNING *;', [name, id])
    .then(data => res.status(201).json(data))
    .catch(e => res.sendStatus(500))
});

// // DELETE  /:id : To delete one user (with the id)
app.delete('/:id', (req, res) => {
    const { id } = req.params;
    pool
    .query('DELETE users WHERE id=$1;', [id])
    .then(data => res.status(201).json(data))
    .catch(e => res.sendStatus(500))
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));