const db = require('../util/db');
const {User} = require('../models/models');
const {get_hashed_password, isSamePassword} = require('../util/authLib')

/**
 * Pre-conditions: A valid email address
 * @param {string} email 
 * @returns {User}
 * Post-conditions:
 * - Returns:
 *   - A User object, if user exists
 *   - Undefined, if user does not exist
 */
 async function getUserByEmail(email){

    let user = undefined
    try{
        const result = await db.query('SELECT 1 FROM "public".users WHERE email = $1;', [email])
        if(result.rowCount == 1){
            user = Object.create(User)
            user['id'] = result.rows[0]['id']
            user['firstname'] = result.rows[0]['firstname']
            user['lastname'] = result.rows[0]['lastname']
            user['email'] = result.rows[0]['email']
            user['password'] = result.rows[0]['password']
            user['registration_date'] = result.rows[0]['registration_date']
        }
    }catch(e){
        console.log(`Error: Can't fetch user with email: ${email}`)
        console.log(e)
    }
    finally{
        return user
    }
}


/**
 * Pre-conditions: A valid ID (type: number)
 * @param {number} id 
 * @returns {User}
 * Post-conditions:
 * - Returns:
 *   - A User object, if user exists
 *   - Undefined, if user does not exist
 */
async function getUserById(id){
     
    let user = undefined
    try{
        const result = await db.query('SELECT 1 FROM "public".users WHERE id = $1;', [id])
        if(result.rowCount == 1){
            user = Object.create(User)
            user['id'] = result.rows[0]['id']
            user['firstname'] = result.rows[0]['firstname']
            user['lastname'] = result.rows[0]['lastname']
            user['email'] = result.rows[0]['email']
            user['password'] = result.rows[0]['password']
            user['registration_date'] = result.rows[0]['registration_date']
        }
    }catch(e){
        console.log(`Error: Can't fetch user with ID: ${id}`)
        console.log(e)
    }
    finally{
        return user
    }
}

/**
 * Pre-conditions:
 * A valid email address
 * @param {string} email 
 * @returns {boolean}
 * Post-Conditions:
 * - Function returns:
 *   - True, if user exists
 *   - False, if user does not exist
 */
async function verifyUserExists(email){
    let userExists = false
    try{
        
        const result = await db.query('SELECT EXISTS(SELECT 1 from users WHERE email=$1)', [email])
        userExists = result.rows[0]['exists']
    }
    catch(e){
        console.log("Error: Can't verify that user exists")
        console.log(e)
    }
    finally{
        return userExists
    }
}

/**
 * Pre-conditions: A User Object
 * @param {User} user
 * @returns {User}
 * Post-conditions:
 * - Returns:
 *   - User's info, if user addition is successful
 *   - undefined, if user addition failed
 */
async function addUser(user){

    let userProfile = undefined
    try{
        const hash = await get_hashed_password(user.password)
        const result = await db.query(
            'INSERT INTO users (first_name, last_name, email, password, registration_date)\
            SELECT $1, $2, $3, $4, $5\
            WHERE NOT EXISTS (SELECT 1 from users where email = $3)\
            ON CONFLICT DO NOTHING RETURNING *;', 
            [user.firstname, user.lastname, user.email, hash, user.registration_date]);

            console.log(`Result from adding user with email = ${user.email}`)
            console.log(result)
            if(result.rowCount == 1){
                userProfile = Object.create(User)
                userProfile['id'] = result.rows[0]['id']
                userProfile['firstname'] = result.rows[0]['firstname']
                userProfile['lastname'] = result.rows[0]['lastname']
                userProfile['password'] = result.rows[0]['password']
                userProfile['registration_date'] = result.rows[0]['registration_date']
            }
    }
    catch(e){
        console.log(`Error: Can't add user with email: ${user.email}. User might already exist`)
        console.log(e)
    }
    finally{
        return userProfile
    }
}


/**
 * TODO: Might need more efficient way of deleting users.
 * @param {string} email 
 * @param {string} password 
 * @returns {boolean}
 * Pre-conditions:
 * - The user's email
 * - The user's password
 * 
 * Post-conditions:
 * - Returns:
 *  - True, if the user deletion is successful
 *  - False, if the user deletion fails or user doesn't exist
 */
 async function deleteUser(email){
    let isSuccess = false
    try{
        // const isvalidPassword = await isSamePassword(user.password, password) *** Do this in controller
        const result = await db.query('DELETE FROM "public".users WHERE email = $1', [email]);
        console.log(`Result from deleting user with email = ${email}`)
        console.log(result)
        if(result.rowCount == 1){
            isSuccess = true
        }
    }
    catch(e){
        console.log(`Error: Can't delete user with email: ${user.email}`)
        console.log(e)
    }
    finally{
        return isSuccess
    }
}

module.exports = {
    addUser, deleteUser, getUserByEmail, getUserById, verifyUserExists
}