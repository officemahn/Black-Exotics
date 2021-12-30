const admin_service = require('../services/admin_service');
const model = require('../models/models');


exports.get_admin = async (req, res, next) => {
    // TODO: Remove after development. THIS FUNCTION IS ONLY FOR TESTING PURPOSES
    admin = await admin_service.get_admin(req.body.email);
    res.status(200).send(admin);
}

exports.create_admin = async (req, res, next) => {
    let response = ''
    let status = 400

    console.log(req.body);
    // TODO: verify email and password
    admin = await admin_service.add_admin(req.body.email, req.body.password)
    if(admin != undefined){
        console.log(admin)
        response = admin //TODO: Should be token
        status = 200
    }
    res.status(status).send(response);
};

exports.delete_admin = async (req, res, next) => {
    // TODO: verify token
    // TODO: verify email and password
    admin_exists = await admin_service.delete_admin(req.body.email);
    let status = admin_exists? 400: 200 
    res.status(status).send();
}

