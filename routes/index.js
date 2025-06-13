// const express = require('express');
// const app = express();
//
// //user routes:
//
// //admin routes:
// const Admin = require('./admin/admin');
// const Category = require('./admin/category');
// const Bank = require('./admin/bank');
//
// app.use('/admin', Admin);
// app.use('/admin/category', Category);
// app.use('/admin', Bank);
//
//
// // card customization routes
// const CardCustomization = require('./admin/cardCustomization');
// app.use('/cards', CardCustomization);
//
// module.exports = app;

const express = require('express');
const app = express();

//user routes:
const UserRoutes = require("./user/user");



app.use('/user', UserRoutes);


//admin routes:
const Admin = require('./admin/admin');
const Category = require('./admin/category');
const Bank = require('./admin/bank');

app.use('/admin', Admin);
app.use('/admin/category', Category);
app.use('/admin', Bank);


// card customization routes
const CardCustomization = require('./admin/cardCustomization');
app.use('/cards', CardCustomization);

module.exports = app;