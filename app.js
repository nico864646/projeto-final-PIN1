const express = require('express');
const app = express();


app.use("/public", express.static('public'));
app.use("/js", express.static('js'));


app.get('/inicio', function(req, res) {
    res.sendFile(__dirname + "/pages/index.html")
}) 

app.get('/quiz/america', function(req, res) {
    res.sendFile(__dirname + "/pages/quiz.html")
}) 

app.get('/quiz/asia', function(req, res) {
    res.sendFile(__dirname + "/pages/quiz.html")
}) 

app.get('/quiz/europa', function(req, res) {
    res.sendFile(__dirname + "/pages/quiz.html")
}) 

app.listen(8081, () => {console.log("Servidor Rodando")})