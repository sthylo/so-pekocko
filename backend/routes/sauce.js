const express = require("express"); 
const router = express.Router();

const sauceCtrl = require("../controllers/sauce");
const auth = require("../middleware/auth"); 
const multer = require("../middleware/multer-config"); 

router.post("/", auth, multer, sauceCtrl.createSauce);
router.post("/:id/like", auth, multer, sauceCtrl.likeSauce);
router.put("/:id", auth, multer, sauceCtrl.updateSauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauces);

module.exports = router;
