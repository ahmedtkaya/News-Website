const express = require("express");
const newsController = require("../controllers/newsController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.route("/").post(roleMiddleware(["writer"]), newsController.createNews);

module.exports = router;
