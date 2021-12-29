const admin_service = require('../services/admin_service');

exports.create_admin = (req, res, next) => {
    // TODO: verify token
    console.log(req.body);
    // TODO: verify email and password
    admin_service.add_admin(req.body.email, req.body.password);
    //admin is added, set status to 200. Else, 400
    res.status(200).send('access token');
};

exports.delete_admin = (req, res, next) => {
     // TODO: verify token
     console.log(req.body);
     // TODO: verify email and password
     admin_service.delete_admin(req.body.email);
     //admin is added, set status to 200. Else, 400
     res.status(200).send('access token');
}