const News = require("../models/News");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createNews = async (req, res) => {
  try {
    const creatednews = await News.create(req.body);
    //coach/classes yap
    res.status(200).redirect("/create");
    req.flash("success", `${creatednews.name} has been created`);
  } catch (error) {
    req.flash("error", `Something went wrong`);
    res.status(404).redirect("/create");
  }
};
