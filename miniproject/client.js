const app = require("express")();

// app.get("/", (req, res)=>{
//     res.sendFile(__dirname + "/login.html");
// })

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/cred.html");
})

app.listen(3333, ()=>{
    console.log("Client App running at 3333");
})