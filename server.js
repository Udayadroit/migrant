var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//database initalization
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('trial13.db');
db.serialize(function(){
    //create table
    db.run('CREATE TABLE IF NOT EXISTS Migrants (Name VARCHAR(255),PhoneNumber VARCHAR(255),ZipCode VARCHAR(255),Job VARCHAR(255))');
    // db.run('CREATE TABLE Customers (PhoneNumber VARCHAR(255),ZipCode VARCHAR(255),Job VARCHAR(255))');
    console.log('Dasone ');
});
   



app.listen(port, function(){
    console.log('Express app listening on port ' + port);
});
app.get('/', function(request, response){
    response.send("GET request recieved at " + request.url);
});
app.get('/test', function(request, response){
    response.send('Hello there');
});

var dict = {};

app.post('/message', function(req, res){
    if (Object.keys(dict).length >10){dict={};}
    if (!dict[req.body.sender]){
        dict[req.body.sender]=["none","none","0","none"];
        console.log('Initialized Conversation');
        res.json({"reply":"Who are you ? 1. Employer or 2. Migrant"});
    }
    else {
        if (dict[req.body.sender][2]=="0"){
            dict[req.body.sender][2]=req.body.message;
            res.json({"reply":"What is your name ?"});
        }
        else{
            if (dict[req.body.sender][3]=="none"){
                dict[req.body.sender][3]=req.body.message;
                console.log('Recieved the Name');
                res.json({"reply":"What is your ZIPCODE ?"});
            }
            else {
            if (dict[req.body.sender][0]=="none"){
                dict[req.body.sender][0]=req.body.message;
                console.log('Recieved the ZIPCODE');
                res.json({"reply":"Please select one of the following : 1. Cook , 2. Security , 3. Driver"});
            }
            else {
                if (dict[req.body.sender][1]=="none"){
                    dict[req.body.sender][1]=req.body.message;
                    console.log('Recieved the JOB REQUIRED');
                    if (dict[req.body.sender][2]=="1"){
                    db.all('SELECT * FROM Migrants WHERE ZipCode = ? AND Job = ?', [dict[req.body.sender][0],dict[req.body.sender][1]], function processRows(err, rows){
                        if(err){
                            res.send(err.message);
                        }
                        else{
                            console.log("Return a list of Migrants ");
                            res.json({"reply":rows});
                        }
                    });
                }
                else {
                    if (dict[req.body.sender][2]=="2"){
                        console.log("Insert a new Migrant ");
                        db.run('INSERT INTO Migrants VALUES (?, ?, ?, ?)', [dict[req.body.sender][3],req.body.sender, dict[req.body.sender][0], dict[req.body.sender][1]], function(err){
                        if(err){
                            console.log(err.message);
                                }
                        else{
                            res.json({"reply":'Inserted Migrant into Database '});
                            }
                        });
                    }
                }
    
    
                    // res.json({"reply":"Below are the job seekers details : "});
                }
            }
        }
        
    }
    }
    
});
// db.close();