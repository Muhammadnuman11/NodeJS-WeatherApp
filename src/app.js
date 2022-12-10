const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 8000;

// For update in any file reload server every time -- Run below command in terminal with nodemon file name  Like
// nodemon app.js -e js,hbs

// public static path
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// hbs use engine
app.set('view engine', 'hbs');
// Get Views folder in tamplates
app.set('views', templatePath);
// Add partials
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

// Routing
app.get("", (req, res)=>{
    res.render('index');
})

app.get("/about", (req, res)=>{
    res.render('about');
})

app.get("/weather", (req, res)=>{
    res.render('weather');
})

app.get("*", (req, res)=>{
    res.render('404error', {
        oopsMsg: "Opps! Page Not Found"
    }); 
})

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})