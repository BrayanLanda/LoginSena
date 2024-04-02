const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
//configuracion del servidor y dependencias
const app = express();
app.use(cors());
app.use(express.json());

//conexion a la base de datos local 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "carolan",
    database: "signup"
});

db.connect();

//registrar un nuevo usuario con en la base de datos 
app.post('/signup', (req, res)=>{
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ]
    db.query(sql, values, (err, data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data)
    });
});
//para realiar el login, comparamos datos en la consulta para y realizamos el select
app.post('/login', (req, res)=>{
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email,req.body.password], (err, data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Success");
        }else{
            return res.json("Faile");
        }
    });
});
//esto lo utilizamos para hiciar el servidos y mandamos mensaje listening en consola para mirar si nos ingresa
app.listen(8080, ()=>{
    console.log("listening port");
})