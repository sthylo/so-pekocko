const jwt = require("jsonwebtoken"); // Importation de jsnwebtoken pour le système de token

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récupération du token provenant de la requête 
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Fonction pour décoder le token
    const userId = decodedToken.userId; // Récupération de l'user ID
    if (req.body.userId && req.body.userId !== userId) { // Si l'user Id de la requête est différent de l'user Id du token
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};
