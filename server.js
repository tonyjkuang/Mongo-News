const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request");
const db = require("./models");

const cheerio = require("cheerio");

//const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoHeadlines", {
    useMongoClient: true
});




app.get("/scrape", function(req, res) {
    request("http://www.foxnews.com/", function(err, response, html){
        var $ = cheerio.load(html);
        let result = {};

        $("h2.title").each(function(i, element){
            let title = $(element).children("a").text();
            let link = $(element).children("a").attr("href");
            let summary = $("p.dek").children("a").attr("href");
//             console.log(`title: ${title}
// link: ${link}
// Summary: ${summary}`);
            result = {
                title: title,
                link: link,
                summary: summary
            };
            console.log(result);
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });

        });
        res.send("Scrape Complete");
    });
});

app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        });
        // .catch(function (err) {
        //     // If an error occurred, send it to the client
        //     res.json(err);
        // });
});


app.listen(PORT, function(){
    console.log(`Listening on ${PORT}`)
});