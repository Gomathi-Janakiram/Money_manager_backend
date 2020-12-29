const express = require("express")
const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient;
const app = express()
const cors = require("cors")

const port = process.env.PORT || 4000
const db_url = "mongodb+srv://admin:PEWkVfmBg4jlEGfm@cluster0.ejolf.mongodb.net/<dbname>?retryWrites=true&w=majority"

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Thank you")
})

app.get("/get", async (req, res) => {
    try {
        const clientInfo = await mongoClient.connect(db_url)
        const db = clientInfo.db("money")
        const data = await db.collection("transaction").find().toArray()
        res.json({ data })
    } catch (err) {
        res.send(err)
    }
})

app.post("/post", async (req, res) => {
    try {
        const clientInfo = await mongoClient.connect(db_url)
        const db = clientInfo.db("money")
        const data=await db.collection("transaction").insertOne(req.body)
        res.json({message:"created"})
    } catch (error) {
        console.log(error)
    }
})

app.delete("/delete/:id",async (req,res)=>{
    try{
        const clientInfo=await mongoClient.connect(db_url)
        const db = clientInfo.db("money")
        const data=await db.collection("transaction").findOneAndDelete({
            _id:req.params.id
        })
        console.log(req.params.id)
        res.json({message:"deleted"})
    }catch(error){
        console.log(error)
    }
})


app.listen(port,(err)=>{
    console.log(`listening to ${port}`)
})