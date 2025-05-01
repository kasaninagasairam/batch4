const express = require('express');
 const dotenv = require('dotenv');
 const bodyParser = require('body-parser');
 const userRoutes =require('./route/userroute');
 const postRoutes = require('./route/postroute');
 const userAuthRoutes = require('./Route/userAuth')
 dotenv.config();
 const app = express();
 const port = 3000;
 
 
 app.use(bodyParser.json());
 
 
 
 
 app.use("/users", userRoutes);
 app.use("/posts", postRoutes);
 app.use("/users/Auth",userAuthRoutes);
 app.listen(port, () => {
     console.log(`Server is running on http:localhost:${port}`);
 });
 module.exports = app;