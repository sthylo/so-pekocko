const bcrypt = require("bcrypt"); // Hasher les mots de passe
const jwt = require("jsonwebtoken"); // Sécurise la connexion avec des tokens
const passwordValidator = require("password-validator"); // Compléxifier les mots de passe

const User = require("../models/User"); 

var schema = new passwordValidator();

schema // Le mot de passe doit contenir au minimum 8 caractères avec au moins 1 minuscule, 1 majuscule et 1 chiffre.
  .is()
  .min(8) 
  .is()
  .max(20)
  .has()
  .uppercase() 
  .has()
  .lowercase() 
  .has()
  .digits() 
  .has()
  .not()
  .spaces(); 

// Création d'un compte utilisateur
exports.signup = (req, res, next) => {
  if (!schema.validate(req.body.password)) {
    return res.status(400).json({ error: "Merci de bien vouloir entrer un mot de passe valide !" });
  } else if (schema.validate(req.body.password)) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

// Connexion à un compte existant
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
