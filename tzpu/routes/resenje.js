const express = require("express");
const bodyParser = require("body-parser");
const { routes } = require("../enums.js");
const router = express.Router();
router.use(bodyParser.json());

router.post(routes.studentUpload, (req, res) => {
  // const { index, resenje } = req.body;
  // studentiResenja.push({
  //   index: index,
  //   resenje: resenje,
  // });
  // res.send("Uspesno ste postavili zadatak.");
});

module.exports = router;
