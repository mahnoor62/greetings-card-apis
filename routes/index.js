const express = require('express');
const app = express();

//user routes:
const UserRoutes = require("./user/user");
const ProfileRoutes = require('./user/profile');




app.use('/user', UserRoutes);
app.use('/user/profile', ProfileRoutes);



//admin routes:
const Admin = require('./admin/admin');
const Category = require('./admin/category');
const Profile = require('./admin/profile');
const Bank = require('./admin/bank');

app.use('/admin', Admin);
app.use('/admin/category', Category);
app.use('/admin', Profile);
app.use('/admin', Bank);


// card customization routes
const CardCustomization = require('./admin/cardCustomization');
app.use('/cards', CardCustomization);

module.exports = app;