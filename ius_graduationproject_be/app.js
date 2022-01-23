import express from 'express';
import bodyParser from 'body-parser'
import pool from './db.js'

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api', (req, res) =>{
    
    res.json({message:"LETS START THIS PROJECT" + req.body});
});

app.post('/api/register', async (req, res) =>{
    console.log(req.body)
    const data = req.body;
    var values = [data.FirstName, data.LastName, data.Email, data.Password, data.BirthDate]
    try {

        const dbResponse = await pool.query("INSERT INTO users (first_name, last_name, email, password, birth_date) VALUES($1,$2,$3,$4,$5) RETURNING *", values)
        
        if (dbResponse.rows.length != 0) {
            console.log("db response if", dbResponse)
            res.status(200);
            res.json({ message: dbResponse.rows[0] });
        } else {
            console.log("db response else", dbResponse)
            res.status(500);
            res.json({ message: "CANNOT_INSERT_NEW_USER" })
        }
        
    } catch {
        res.status(500);
        res.json({ message: "CANNOT_INSERT_NEW_USER" })
    }
   
});

app.post('/api/login', async (req, res) =>{
    console.log("body", req.body)
    const data = req.body;
    var values = [data.Email, data.Password]
    try {

        const dbResponse = await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", values)
        
        if (dbResponse.rows.length != 0) {
            console.log("db response if", dbResponse)
            res.status(200);
            res.json(dbResponse.rows[0]);
        } else {
            console.log("db response else", dbResponse)
            res.status(500);
            res.json({ message: "CANNOT_FIND_USER" })
        }
        
    } catch {
        res.status(500);
        res.json({ message: "CANNOT_FIND_USER" })
    }
   
});

app.listen(5000, ()=> console.log("Server up and running..."));