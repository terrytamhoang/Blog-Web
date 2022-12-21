const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require("mongoose")

mongoose.set('strictQuery',false);


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//mongodb://0.0.0.0:27017/
mongoose.connect("mongodb+srv://********@cluster0.yieyhxv.mongodb.net/BlogDB")

// Create the schema for compose
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

// Create collection in Post database
const Post = mongoose.model("Post",postSchema);


app.get("/",function (req,res){

  Post.find({},function(err,foundPosts){

    res.render("home",{HomeParagraph:homeStartingContent,
      posts: foundPosts

    });
  });
  //"home" is pointing to home.ejs and HomeParagraph is pointing to <%=HomeParagraph%> in home.ejs
});

app.get("/about",function (req,res){
  res.render('about',{AboutParagraph: aboutContent});
})

app.get("/contact",function (req,res){
  res.render("contact",{contactInfo: contactContent});
})

app.get("/compose",function (req,res){
  res.render("compose");
})

app.get("/posts/:postId",function (req,res){
  const requestPostId = req.params.postId;
  let titleWeb = _.kebabCase(_.lowerCase(req.params.titlePage));

  Post.findOne({_id:requestPostId},function(err,post){
    res.render("post",{
      title: post.title,
      content:post.content
    })
  })
})



app.post("/compose",function (req,res){
  const post = new Post({
    title: req.body.TitleName,
    content: req.body.PostMessage
  });
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
