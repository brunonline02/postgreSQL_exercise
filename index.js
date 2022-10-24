
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

app.get('/', (req, res) => {
    pool
    .query('SELECT * FROM users;')
    .then(data => res.json(data))
    .catch(e => res.sendStatus(500))
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    pool
    .query('SELECT * FROM users WHERE id=$1;', [id])
    .then(data => res.json(data))
    .catch(e => res.sendStatus(500))
});

// app.get('/news', (req, res) => res.send('this is the news page welcome!'));
// app.get('/data', (req, res) => res.json({name:"bruno", bio:"i like coding"}));

// app.get('/users/:id', (req, res) => {
//     console.log(req.params.id); // 1
//     console.log(req.query); // name
//     res.send("sorry database is offline, try again later")
// });
   

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));