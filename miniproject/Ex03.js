const app = require("express")();

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/user.html");
})

app.listen(3333, ()=>{
    console.log("Client App running at 3333");
})