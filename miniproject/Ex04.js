//Example for creating JSON Rest server....
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;

//middleware....
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

//GET(Reading), POST(Adding), PUT(Updating), DELETE(Deleting) data....
let books = [];//blank array...

function readData(){
    const filename = "data.json";//new file... 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    book = JSON.parse(jsonContent);
}

function saveData(){
    const filename = "data.json";
    const jsonData = JSON.stringify(books);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/books", (req, res)=>{
    readData();
    res.send(JSON.stringify(books));    
})

app.get("/books/:id", (req, res)=>{
    const bookid = req.params.id;
    if(books.length == 0){
        readData();
    }
    let foundRec = books.find((e) => e.bookId == bookid);
    if(foundRec == null)
        throw "Book not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/books", (req, res)=>{
    if(books.length == 0)
        readData();//Fill the array if it is not loaded....
    let body = req.body;
    //iterate thro the collection
    for (let index = 0; index < books.length; index++) {
        let element = books[index];
        if (element. bookId== body.bookId) {//find the matching record
            element.bookTitle = body.bookTitle;
            element.bookAuthor = body.bookAuthor;
           
            saveData();
            res.send("Employee updated successfully");
        }
    }
    //update the data
    //exit the function....
})

app.post('/books', (req, res)=>{
    if (books.length == 0)
        readData();//Fill the array if it is not loaded....
    let body = req.body;//parsed data from the POST...
    books.push(body);  
    saveData();//updating to the JSON file...
    res.send("Book added successfully");
})
app.delete("/books/:id", (req, res)=>{
  throw "Do it UR Self!!!!";  
})

app.listen(1234, ()=>{
    console.log("Server available at 1234");
})