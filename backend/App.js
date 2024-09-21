const express = require("express"); // common js module
const app = express()
const cors = require("cors")

function makeid() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

const arr=[]; //in memory address
let playerDetails = [];
let teams = [];



app.use(cors())
app.use(express.json()) //its a middleware which parses the request


// player
app.post("/players",(req,res)=>{

    let id=makeid(5)
    req.body.id=id
    playerDetails.push(req.body);
    res.json({message:"player added successfully"})
});

app.get("/players",(req,res)=>{
    res.json({message:"success",data:playerDetails})
})

app.delete("/players/:id",(req,res)=>{
  let id = req.params.id
  playerDetails=playerDetails.filter(ele=>ele.id!=id)
  res.json({
    message:"data deleted"
  })
})

app.put("/players",(req,res)=>{
  console.log(req.body)
  let id = req.body.id;
  playerDetails = playerDetails.filter(ele=>ele.id!=id)
  playerDetails.push(req.body)
  res.json({
    message:"player details edited successfully"
  })
})

// app.put("/players/:id", (req, res) => {
//   let id = req.params.id;
//   let updatedPlayer = req.body;
//   playerDetails = playerDetails.map(player => (player.id === id ? updatedPlayer : player));
//   res.json({ message: "Player details edited successfully", data: updatedPlayer });
// });


// Adding Teams 

app.post("/teams",(req,res)=>{
     let id = makeid(5) 
     req.body.id=id
     teams.push(req.body)

     res.json({
      message:"Team Added Succeessfully"
     })
})

 
app.get("/teams",(req,res)=>{
  res.json({message:"success",data:teams})
})






app.listen(9090,function(){
    console.log("server running on port 9090")
})