require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({"connectionString":process.env.DATABASE_URL})
const express = require("express")
const floorPlanData = require('./floorPlanData')
const app = express()
// const cors = require('cors')
// const router = express.Router()
console.log(process.env.DATABASE_URL !== undefined)
function hello()
{
    console.log("Server Running")
}

// app.use(cors())
app.use(express.json())
app.use((req,res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST, PUT,PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization")
    next()
})
app.get("/tables",(req,res,next) =>{
    pool.query("SELECT * FROM clover_sky_restaurant_tables").then(result => res.json(result.rows)).catch(err => {console.log(err), res.status(500).json({message:"Database Error"})})
})

app.get("/tables/:id/status",(req,res,next)=>{
    res.json(req.params)
})

app.post("/tables/:id/status",(req,res,next)=>{
    const requested_id = req.params.id
    const nextStatus = req.body["newStatus"]
    pool.query("UPDATE clover_sky_restaurant_tables SET status = $1 WHERE id = $2 RETURNING *",[nextStatus,requested_id]).then(result => res.json(result.rows[0])).catch(err => {console.log(err),res.status(500).json({message:"Database Error"})})
})
// app.listen(3000,hello)
app.listen(process.env.PORT? process.env.PORT : 3000,()=>{
    console.log("server Running")
})