const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const router = express.Router();
const { routes, dockerUsers } = require("../enums.js");
const fs = require("fs");
router.use(bodyParser.json());
const shell = require("shelljs");

const dockerHubUsername = "jasminaturku";

const login = async (token) => {
  const options = {
    method: "POST",
    url: "https://hub.docker.com/v2/users/login/",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: dockerHubUsername,
      password: token,
    }),
  };
  const response = await new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);
      resolve(body);
    });
  });

  return response;
};

const publishImage = async (user) => {
  const nameOfSourceImageWithTag = `${user.username}:latest`;

  let commands = "";
  commands += `docker build -t ${nameOfSourceImageWithTag} . \r\n`;
  commands += "docker logout \r\n";
  commands += `docker login --username ${dockerHubUsername} --password ${user.token} \r\n`;
  commands += `docker tag ${nameOfSourceImageWithTag} ${dockerHubUsername}/tzp:${user.username} \r\n`;
  commands += `docker push ${nameOfSourceImageWithTag} \r\n`;

  fs.writeFileSync("publishImage.bat", commands);

  shell.exec("publishImage.bat");
};

router.post(routes.dockerUpload, async (req, res) => {
  const { username } = req.body;

  const user = dockerUsers.find(
    (dockerUser) => dockerUser.username === username
  );

  await login(user.token);
  publishImage(user);
});

module.exports = router;
