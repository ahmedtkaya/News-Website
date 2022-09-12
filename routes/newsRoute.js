const express = require("express");
const newsController = require("../controllers/newsController");
const roleMiddleware = require("../middlewares/roleMiddleware");
const News = require("../models/News");

const router = express.Router();

router.route("/").post(newsController.createNews);
router.route("/:id").get(newsController.getNews);
module.exports = router;
