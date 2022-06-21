const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const { Pool } = require("pg");

const app = express()
const port = 5000

app.use(cors())
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// Process application/json
app.use(bodyParser.json());



app.post('/qrcode', async (req, res) => {

    const address = req.body;
    const text = "INSERT INTO keys_test(address)VALUES($1)"
    const values = [address]

    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "keys_test",
        password: "tezos",
        port: "5432"
    });

    try {
        await pool.query(text, values)
        pool.end();
        res.statusCode = 200;
        res.send("Success");
    } catch (err) {
        console.log(err.stack)
        res.statusCode = 500;
        res.send("Failure");
    }
})

app.listen(port, () => {
    console.log(`port: ${port}`)
})