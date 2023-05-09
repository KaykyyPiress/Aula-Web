var http = require("http");
var express = require ("express");
var mongoose = require ("mongoose")

mongoose.connect("mongodb://localhost/AulaDB")

var app = express();
app.use(express.static("./public"));

var usuarioSchema = new mongoose.Schema({
    db_nome : 'String',
    db_login : 'String',
    db_senha: 'String'
});


var usuarioModel = mongoose.model("Usuarios", usuarioSchema);

app.set("view engine", "ejs")
app.set("views", "./views")

app.get("/cadastrar", function(req, resp){
    let nome = req.query.nome;
    let login = req.query.login;
    let senha = req.query.senha;

    var novo = new usuarioModel({
        db_nome: nome,
        db_login: login,
        db_senha: senha
    })

    
    novo.save();
    resp.write("Cadastrado com Sucesso");
    resp.end();

})


app.get("/", function (req, resp){
    resp.render("cadastro")
})


var server = http.createServer(app);
server.listen(80);
console.log("Acho que tá rodando...");

