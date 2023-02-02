const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { routes } = require("../enums.js");
const fs = require("fs");
router.use(bodyParser.json());

let profesorZadatak = "Obavestite profesora da jos uvek nije kreirao zadatak.";

router.get(routes.studentZadatak, (req, res) => {
  res.send(`Zadatak: ${profesorZadatak}`);
});

router.post(routes.profesorUpload, (req, res) => {
  const { zadatak } = req.body;
  fs.writeFileSync("./zadatak/zadatak.txt", zadatak);
  res.send(`Zadatak je dodat na back`);
});

module.exports = router;
