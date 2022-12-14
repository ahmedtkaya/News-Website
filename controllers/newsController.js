const News = require("../models/News");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createNews = async (req, res) => {
  try {
    const creatednews = await News.create({
      title: req.body.title,
      description: req.body.description,
      user: req.session.userID,
      category: req.body.category,
    });
    //bu bir simülasyondur ve hatayı yakalamak için try catch yazdık
    req.flash("success", `${creatednews.title} has been created successfully`);
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    req.flash("error", `${error}`);
    res.status(404).redirect("/users/dashboard");
  }
};

exports.getNews = async (req, res) => {
  const news = await News.findById({ _id: req.params.id }).populate("user");
  const writername = await User.findById(req.session.userID);
  const categories = await Category.find();
  const threenews = await News.find().sort("-createdAt").limit(3);
  res.status(200).render("contentnews", {
    page_name: "contentnews",
    news,
    writername,
    categories,
    threenews,
  });
};
