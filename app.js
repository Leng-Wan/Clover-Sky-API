const express = require("express")
const floorPlanData = require('./floorPlanData')
const app = express()
// const cors = require('cors')
// const router = express.Router()

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
    res.json(floorPlanData)
})

app.get("/tables/:id/status",(req,res,next)=>{
    res.json(req.params)
})

app.post("/tables/:id/status",(req,res,next)=>{
    const requested_id = req.params.id
    const nextStatus = req.body["newStatus"]
    const newTable = floorPlanData.find(item => item.id ===  requested_id)
    newTable["status"] = nextStatus
    res.json(newTable)
})
// app.listen(3000,hello)
app.listen(3000,()=>{
    console.log("server Running")
})