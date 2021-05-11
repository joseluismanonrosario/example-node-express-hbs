const express = require ("express");
const exphbs = require ("express-handlebars");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main-view",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");


app.use(express.static(path.join(__dirname, "public")));



app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/about", (req, res)=>{
  res.render("about");
});

app.get("/contact", (req, res)=>{
  res.render("contact");
});

app.get("/works", (req, res)=>{
  res.render("works");
});

app.get("/services", (req, res)=>{
  res.render("services");
})

app.listen(port, ()=>{

    console.log("Server on port 3000");
});

