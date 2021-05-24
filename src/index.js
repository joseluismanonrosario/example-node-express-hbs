const express = require ("express");
const exphbs = require ("express-handlebars");
const path = require("path");
const config = require('./config/config');

const Clientes = require ('./models/clientes');


const app = express();

const port = process.env.PORT || config.app.port;

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
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res)=>{
    res.render("index");
});

app.get("/about", (req, res)=>{
  res.render("about");
});

app.get("/contact", (req, res)=>{
  res.render("contact");
});

app.post("/contact", async (req, res)=>{
  try {
    const {name, email, phone, company } = req.body;
    await Clientes.create({name, email, phone, company});
    const clientesDB = await Clientes.find();
    res.send(clientesDB);

  } catch (error) {
    console.log('error fatal');
  }
  console.log(req.body);
  
});

app.get("/works", (req, res)=>{
  res.render("works");
});

app.get("/services", (req, res)=>{
  res.render("services");
})

app.use((req, res) => {
  res.render("404");
});


app.listen(port, ()=>{

    console.log("Server on port 3000");
});

