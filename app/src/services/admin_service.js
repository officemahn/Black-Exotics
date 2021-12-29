const db = require('../util/db');
require('../models/models');

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<string>} JSON
 */

function add_admin(email, password){
    db.query('INSERT INTO "public".admin(email, password) VALUES ($1, $2) RETURNING *;', [email, password], (err, result) => {
        if(err){
            console.log(err);
            return null
        };
        console.log("admin added")
        console.log(result);
    }); 
}
// function add_admin(email, password){

//     db.query('SELECT id FROM "public".admin WHERE email = $1', [email], (err, result) => {
//         if(err){
//             console.log(err);
//             return null
//         };
//         console.log(result)
//         if(result == undefined){
//             db.query('INSERT INTO "public".admin(email, password) VALUES ($1, $2); RETURNING *', [email, password], (err, result) => {
//                 if(err){
//                     console.log(err);
//                     return null
//                 };
//                 console.log("admin added")
//                 console.log(result.rows);
//             });
//         }
//     });

//     return null
// }

// /**
//  * 
//  * @param {string} email 
//  * @returns {Promise<string>} JSON
//  */
// async function delete_admin(email){
//     try{
//         const {result} = db.query('DELETE FROM "public".admins WHERE email = $1; RETURNING *', [email]);
//         console.log(result);
//         return result;
//     }catch(error){
//         console.log(error);
//     }
//     return null
// }

// /**
//  * 
//  * @param {string} email 
//  * @returns {Promise<string>} JSON
//  */
// async function get_admin(email){
//     try{
//         const {result} = db.query('SELECT FROM "public".admins WHERE email = $1; RETURNING *', [email]);
//         console.log(result);
//         return result;
//     }catch(error){
//         console.log(error);
//     }
//     return null
// }

module.exports = {
    add_admin
}