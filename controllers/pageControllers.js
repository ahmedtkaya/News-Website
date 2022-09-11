const User = require("../models/User");
const Category = require("../models/Category");
const News = require("../models/News");
exports.getIndexPage = (req, res) => {
  //değişecek
  res.status(200).render("index", {
    page_name: "index",
  });
};
exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getContactPage = (req, res) => {
  //değişecek
  res.status(200).render("contact", {
    page_name: "contact",
  });
};
exports.getRegisterPage = (req, res) => {
  //değişecek
  res.status(200).render("register", {
    page_name: "register",
  });
};
exports.getLoginPage = (req, res) => {
  //değişecek
  res.status(200).render("login", {
    page_name: "login",
  });
};
/*
exports.getCreatePage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate("news");
  const categories = await Category.find();
  const news = await News.find();
  res.status(200).render("create", {
    page_name: "create",
    user,
    categories,
    news,
  });
};*/
