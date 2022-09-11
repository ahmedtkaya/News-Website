const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    unique: true, //bu isimden sadece bir veri istiyorsak yazacağız
    required: true,
  }, //append photo schema
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    //kurslarla kategori bağlantılı olacağı için course.js modelinin içine Category.js modelini import etmemiz gerek
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    //kurslarla kategori bağlantılı olacağı için course.js modelinin içine Category.js modelini import etmemiz gerek
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
//bununla url kısmında beraber id yerine name gözükecek
NewsSchema.pre("validate", function (next) {
  this.slug = slugify(this.title, {
    // burada slug ile name'i eşitliyor
    lower: true,
    strict: true, //name'de gereksiz karakterleri siler (- :) gibi
  });
  next();
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
