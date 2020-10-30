const { send } = require("process");

express = require("express");
app = express();

book = require("./book.json");


app.get("/details", function(req, res)
{
    nameList = [];
    book.forEach(element =>
    {
        nameList.push(element) 
    });
    res.send(nameList);
})

 
app.get("/searchByTitle", function(req, res)
{
    keyword = req.query.sTitle;
    searchTitle = [];
    book.forEach(element =>
    {
        if(keyword == element.bookTitle)
        {
            searchTitle.push(element) 
        }
    });
    res.send(searchTitle);
})

app.get("/searchByAuthor", function(req, res)
{
    keyword = req.query.sAuthor;
    searchauthor = [];
    book.forEach(element =>
    {
        if(keyword == element.Author)
        {
            searchauthor.push(element)
        }
    });
    res.send(searchauthor);
})


/*// Search by Cuisine (Indian, Arabian and Italian)
app.get("/searchByCuisine", function(req, res)
{
    keyword = req.query.sCuisine;
    searchCuisine = [];
    hotel.forEach(element =>
    {
        for (const key in element.cuisine)
        {
            if(keyword == element.cuisine[key])
            {
                searchCuisine.push(element.name);
            }
        }
    });
    res.send(searchCuisine);
})*/


// Server Listening...
app.listen(3000, function(req, res)
{
    console.log("Server listening to port 3000");
})
