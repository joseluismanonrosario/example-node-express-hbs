const express = require ("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const exphbs = require ("express-handlebars");
const path = require("path");
const config = require('./config/config');
const nodemailer = require('nodemailer');
const compression = require("compression");
const Clientes = require ('./models/clientes');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const transport=nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:465,
  secure:true,
  auth:{
      user:config.mail.user,
      pass:config.mail.pass
  }
})

transport.verify().then(()=>{
  console.log('Ready to send emails');
})


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

app.use(limiter);
app.use(helmet());
app.use(compression());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public', {
  maxAge: 2592000, //2592000 en minutos equivale a 30 dias
  setHeaders: function(res, path) {
      res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());//2592000000 en milisegundos equivale a 30 dias
    }
}))

// app.get('/*', function (req, res, next) {

//   //if (req.url.indexOf("assets/img/") === 0 || req.url.indexOf("assets/css/") === 0) {
//     console.log("paso por aqui dentro");
//     res.setHeader("Cache-Control", "public, max-age=2592000"); //2592000 en minutos equivale a 30 dias
//     res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString()); //2592000000 en milisegundos equivale a 30 dias
//   //}
//   console.log(req.url);
//   next();
// });

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

    await transport.sendMail({
      from:config.mail.user,
      to:req.body.email,
      subject:req.body.subject,
      html:`<h1>${req.body.message}<\h1>`
    });
    console.log('enviado');

  } catch (error) {
    console.log(error);
  }

  try {

    const {name, email, phone, company } = req.body;
    await Clientes.create({name, email, phone, company});
    const clientesDB = await Clientes.find();
    res.send(clientesDB);

  } catch (error) {
    console.log('error al guardar en base de datos');
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

