const db = require('../util/db');
const model = require('../models/models');

/**
 * 
 * @param {string} email 
 * @returns {model.Admin}
 */
async function get_admin(email){
    let admin = undefined
    try{
        const result = await db.query('SELECT id FROM "public".admin WHERE email = $1;', [email])
        if(result.rowCount > 0){
            admin = Object.create(model.Admin);
            admin['id'] = result.rows[0]['id']
            admin['email'] = result.rows[0]['email']
            admin['password'] = result.rows[0]['password']
        }
    }catch(e){
        console.log(e)
    }
    finally{
        return admin
    }
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {model.Admin}
 */
async function add_admin(email, password){
    let admin = undefined
    try{
        const exising_admin = await get_admin(email)
        if(exising_admin == undefined){
           const result = await db.query('INSERT INTO "public".admin(email, password) VALUES ($1, $2) RETURNING *;', [email, password])
           if(result.rowCount > 0){
               admin = Object.create(model.Admin);
               admin['id'] = result.rows[0]['id']
               admin['email'] = result.rows[0]['email']
               admin['password'] = result.rows[0]['password']
           }
        }else{console.log('admin already exists')}
    }
    catch(e){
        console.log(e)
    }
    finally{
        console.log('admin added')
        return admin
    }
}

/**
 * 
 * @param {string} email 
 * @returns {boolean}
 */
async function delete_admin(email){
    let admin_exists = true
    try{
        const exising_admin = await get_admin(email)
        if(exising_admin != undefined){
            const result = await db.query('DELETE FROM "public".admins WHERE email = $1 RETURNING *;', [email])
            result.rowCount==1? admin_exists = false: true
        }
    }catch(error){
        console.log(error);
    }finally{
        return admin_exists
    }
}

module.exports = {
    get_admin, add_admin, delete_admin
}