const express = require('express');
const app = express();

//user routes:
const UserRoutes = require("./user/user");
const ProfileRoutes = require('./user/profile');
const GameRoutes = require('./user/game');
const playerRoutes = require('./player');
const gameCustomization = require('./user/game_customization');
const Published = require('./user/publish');
const Detail = require('./user/playerdetails');
const Game = require('../routes/game');
const TempUser = require('../routes/tempUser/temp_user');


app.use('/user', UserRoutes);
app.use('/user/profile', ProfileRoutes);
app.use('/user/game', GameRoutes);
app.use('/user/player', playerRoutes);
app.use('/game-customization', gameCustomization);
app.use('/user/game', Published);
app.use('/user/player', Detail);
app.use('/game', Game);
app.use('/temporary-user', TempUser);


//admin routes:
const Admin = require('./admin/admin');

const Profile = require('./admin/profile');
const Transaction = require('./admin/transaction');
const Bank = require('./admin/bank');

app.use('/admin', Admin);

app.use('/admin', Transaction);
app.use('/admin', Profile);
app.use('/admin', Bank);


// card customization routes
const CardCustomization = require('./admin/cardCustomization');
app.use('/cards', CardCustomization);

module.exports = app;