const express = require("express");
const cors = require("cors");
const zadatakRouter = require("./routes/zadatak.js");
const resenjaRouter = require("./routes/resenje.js");
const loginRouter = require("./routes/login.js");
const dockerUploadRouter = require("./routes/dockerUpload.js");

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/front"));

app.use(zadatakRouter);
app.use(resenjaRouter);
app.use(loginRouter);
app.use(dockerUploadRouter);

app.listen(9000, () => {
  console.log(`Server je pokrenut!`);
});

// import { ConfidentialClientApplication } from "@azure/msal-node";
// //PRIBAVLJANJE TOKENAconst config ={
//    auth:{
//     clientId: '',
//     authority: 'https://login.microsoftonline.com/tenant',
//     clientSecret: ''};
//     var client = new ConfidentialClientApplication(config);
//     var request = { scopes: [ 'https://graph.microsoft.com/.default' ]};
//     let response = await client.acquireTokenByClientCredential(request);console.dir(response);
//    }
