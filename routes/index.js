var express = require("express");
const { response } = require("../app");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    // res.render("index", { title: "Express" });
    console.log("Oioioi");
    let page = `<html><head><title>Iacon</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Express :D</h1><p>Welcome to Express Hiiii</p></body></html>`;
    console.log(page);
    res.send(page);
});

module.exports = router;
