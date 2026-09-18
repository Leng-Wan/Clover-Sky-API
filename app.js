const express = require("express")
const floorPlanData = require('./floorPlanData')
const app = express()
// const router = express.Router()

function hello()
{
    console.log("Server Running")
}

app.use(express.json())
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