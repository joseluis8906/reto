const express = require('express');
const app = express ();

var pgp = require ('pg-promise')();
var db = pgp ('postgres://reto:AHJ6L-9KD26-Y0BW4-QJT71-8CVAF@127.0.0.1:5432/reto');

app.get('/', function(req, res)
{
    db.one ('SELECT Version();').then(function(data)
    {
        res.send (data);
    }).catch(function(error)
    {
        console.log (error);
    });
    
});

app.listen (8080, function (){
    console.log ('Example App listening.');
});