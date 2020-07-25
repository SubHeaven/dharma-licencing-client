const axios = require("axios");
const crypto = require("crypto");
const express = require("express");
const getMAC = require("getmac").default;
const fs = require("fs");
const { response } = require("../app");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    let aditional = "";
    let m = getMAC();
    console.log(m);
    let mac = `<br><p>MAC: ${m}</p>`;
    aditional = `${aditional}${mac}`;
    let server = JSON.parse(fs.readFileSync("bin/server"));
    console.log(server);
    let licence = JSON.parse(fs.readFileSync("licence.json"));
    let cnpj = `<br><p>CNPJ: ${licence.cnpj}</p>`;
    aditional = `${aditional}${cnpj}`;
    var mykey = crypto.createCipher("aes-128-cbc", "Theres no place like home");
    s = mykey.update(licence.cnpj, "utf8", "hex");
    s += mykey.final("hex");
    m = m.split(":");
    s = `${m[0]}${m[1]}${s.slice(0, 7)}${m[2]}${m[3]}${s.slice(7, 14)}${m[4]}${
        m[5]
    }${s.slice(14)}|${req.query.acao}`;
    s = Buffer.from(s, "utf8").toString("hex");

    axios
        .get(`http://${server.host}:${server.port}/licence?key=${s}`)
        .then((response) => {
            console.log(response.data);
            res.send(response.data);
        })
        .catch((error) => {
            console.log("**************************************************");
            console.log("Error:");
            console.log(error.errno);
            console.log(error.config.url);
            console.log("**************************************************");
            res.send(false);
        });
});

module.exports = router;
