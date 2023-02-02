const express = require("express");
const bodyParser = require("body-parser");
const { tipKorisnika } = require("../enums.js");
const { routes, dockerUsers } = require("../enums.js");
const router = express.Router();
router.use(bodyParser.json());

router.post(routes.login, (req, res) => {
  const { username } = req.body;

  const korisnik = dockerUsers.find(
    (dockerUser) => dockerUser.username === username
  );
  let response = { tip: tipKorisnika.undefined };

  if (korisnik && korisnik.tip === tipKorisnika.profesor) {
    response = { tip: tipKorisnika.profesor };
  } else if (korisnik && korisnik.tip === tipKorisnika.student) {
    response = { tip: tipKorisnika.student };
  }

  res.json(response);
});

module.exports = router;
