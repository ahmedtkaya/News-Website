const News = require("../models/News");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createNews = async (req, res) => {
  try {
    const creatednews = await News.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });
    //users/dashboard yap
    res.status(200).redirect("/users/dashboard");
    req.flash("success", `${creatednews.name} has been created`);
  } catch (error) {
    req.flash("error", `Something went wrong`);
    res.status(404).redirect("/users/dashboard");
  }
};
