const db = require('../util/db');
const model = require('../models/models');
const {get_hashed_password, isSamePassword} = require('../util/authLib')

/**
 * 
 * @param {string} email 
 * @returns {boolean}
 */
async function verify_admin_exists(email){
    let admin = Object.create(model.Admin)
    try{
        admin = await get_admin(email);
    }catch(e) {
        console.log('cannot verify user exists')
    }
    finally{
        admin_exists = (admin.email == email)? true: false
        return admin_exists
    }
}

/**
 * 
 * @param {string} email 
 * @returns {model.Admin}
 */
async function get_admin(email){
    let admin = Object.create(model.Admin)
    try{
        const result = await db.query('SELECT id FROM "public".admin WHERE email = $1;', [email])
        if(result.rowCount > 0){
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
    let admin = Object.create(model.Admin);
    try{
        const admin_exists = await verify_admin_exists(email)
        console.log(admin_exists)
        if(!admin_exists){
            const hash = await get_hashed_password(password)
            const result = await db.query('INSERT INTO "public".admin(email, password) VALUES ($1, $2) RETURNING *;', [email, hash])
            console.log(`Result from adding user with email = ${email} & password${password}:`)
            console.log(result)
            if(result.rowCount > 0){
                admin['id'] = result.rows[0]['id']
                admin['email'] = result.rows[0]['email']
                admin['password'] = result.rows[0]['password']
            }
        }
        else{console.log('admin already exists')}
    }
    catch(e){
        console.log(e)
    }
    finally{
        return admin
    }
}

/**
 * 
 * @param {string} email 
 * @returns {boolean}
 */
async function delete_admin(email, password){
    let isSuccess = true
    try{
        const admin = await get_admin(email)
        const isvalidPassword = await isSamePassword(admin.password, password)

        if(admin.email == email && isvalidPassword){
            const result = await db.query('DELETE FROM "public".admin WHERE email = $1 RETURNING *;', [email])
            console.log(result)
            isSuccess = result.rowCount==1? true: false
        }
    }catch(error){
        console.log(error);
    }finally{
        return isSuccess
    }
}

module.exports = {
    verify_admin_exists, get_admin, add_admin, delete_admin
}