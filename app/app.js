require('module-alias/register');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();

// app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json())

admin_routers = require('./src/routes/admin');
auth_routers = require('./src/routes/auth');

app.use('/admin', admin_routers);
app.use(auth_routers)

app.use((req, res, next) => {
    res.status(404).send('Resource Not Found')
});

app.listen(3000);