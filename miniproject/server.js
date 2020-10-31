const app = require('express')();
const parser = require("body-parser");
const cors = require('cors');
const fs = require("fs");
const dir = __dirname;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());
let books = [];
 
function readData(){
    const filename = "book.json";//new file... 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    books = JSON.parse(jsonContent);
}
 
function saveData(){
    const filename = "book.json";
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
        throw "book not found";
    res.send(JSON.stringify(foundRec))
})
 
app.put("/books", (req, res)=>{
    if(books.length == 0)
        readData();//Fill the array if it is not loaded....
    let body = req.body;
    //iterate thro the collection
    for (let index = 0; index < books.length; index++) {
        let element = books[index];
        if (element.bookId == body.bookId) {//find the matching record
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
    res.send("book added successfully");
})
/*
app.delete("/books/:id", (req, res)=>{
const reqid=req.params.id;
const index=indexOf(reqid);
books.splice(index,1);
if(err)
res.send(err);
res.json(books);
})
*/
app.listen(1234, ()=>{
    console.log("Server available at 1234");
})