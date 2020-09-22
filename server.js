const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Routes
// ===========================================================

//   * GET `/api/status` - Should read the `db.json` file and return all saved status' as JSON.
app.get("/api/status", (req, res) => {
   
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", function (err, data) {
        if (err) throw err;
        return res.json(JSON.parse(data));
    })

})
 app.get("/", (req, res) => {
     
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", function (err, data) {
        if (err) throw err;
        return res.json(JSON.parse(data));

    })
})
//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return 
// the new note to the client.

app.post("/api/status", (req, res) => {

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", function (err, data) {
        if (err) throw err;
        //get unique id
        const id = uuid.v4();
        const statusJSON = JSON.parse(data);
        // this is so I can add the unique id to the request
        const modifedReq = req.body;
        modifedReq.id = id;
        statusJSON.push(modifedReq);

        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(statusJSON), (err) => {
            if (err) {
                throw err;
            }
            // console.log(statusJSON)
        })
    })





})

app.delete("/api/status/:id", (req, res) => {

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", function (err, data) {
        if (err) throw err;
        const statusJSON = JSON.parse(data);
        // keep only the items that don't match the id then write back to the db.json file.
        const result = notesJSON.filter(arrayItem => arrayItem.id !== req.params.id);
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify
            (result), (err) => {
                if (err) {
                    throw err;
                }
            })
    });


})
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);

})