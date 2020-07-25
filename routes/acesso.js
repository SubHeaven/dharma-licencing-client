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
    let mac = `<br><p>MAC: ${m}</p>`;
    aditional = `${aditional}${mac}`;
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
        .get(`http://127.0.0.1:7360/licence?key=${s}`)
        .then((response) => {
            console.log(response.data);
            res.send(response.data);
        })
        .catch((error) => {
            console.log(error);
            res.send(false);
        });
    // let page = `<html><head><title>Iacon</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Express :D</h1><p>Welcome to Express Oioioi</p>${aditional}</body></html>`;
    // console.log(page);
    // res.send(page);
});

module.exports = router;
