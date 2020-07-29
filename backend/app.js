const express = require("express"); // Framework d'infrastructure d'applications Web Node.js
const bodyParser = require("body-parser"); // Gérer la demande POST provenant de l'application front-end
const mongoose = require("mongoose"); // Package qui facilite les interactions avec notre base de données MongoDB
const path = require("path"); // Gestionnaire de routage pour les images en upload et download
const helmet = require("helmet"); // Configure de manière appropriée et sécurisée les en-têtes HTTP 

const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user"); 

// Connexion à la base de données
mongoose  
  .connect(
    "mongodb+srv://sthylo:jtesuce@so-pekocko.owh9w.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  ) 
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Utilisation du framework express
const app = express(); 

// Middleware Header pour permettre à toutes les demandes de toutes les origines d'accéder à notre API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); 
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use (helmet()); 
app.use(bodyParser.json()); 

app.use("/images", express.static(path.join(__dirname, "images"))); 

app.use("/api/auth", userRoutes); 
app.use("/api/sauces", sauceRoutes); 

module.exports = app;
