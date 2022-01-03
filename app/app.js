require('module-alias/register');
const express = require('express');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const csurf = require('csurf');
const admin_routers = require('./src/routes/adminRoute');
const auth_routers = require('./src/routes/auth');

const app = express();
app.use(bodyparser.json());
app.use(cookieparser('secret'));
app.use(csurf({cookie: true}));

app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});

// Routers
app.use('/admin', admin_routers);
app.use(auth_routers)

// If req doesn't match any route
app.use((req, res, next) => {
    res.status(404).send('Resource Not Found')
});

app.listen(3000);