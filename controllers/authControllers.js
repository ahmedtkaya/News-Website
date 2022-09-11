const News = require("../models/News");
const User = require("../models/User");
const Category = require("../models/Category");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).redirect("/login");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            req.session.userID = user._id;
            res.status(200).redirect("/users/dashboard");
          } else {
            req.flash("error", "Your Password is not correct!");
            res.status(400).redirect("/login");
          }
        });
      } else {
        req.flash("error", "User is not exists!");
        res.status(400).redirect("/login");
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate("news");
  const writercontents = await News.find({ user: req.session.userID });
  const categories = await Category.find();
  const users = await User.find();
  res.status(200).render("dashboard", {
    user,
    writercontents,
    page_name: "dashboard",
    categories,
    users,
  });
};
