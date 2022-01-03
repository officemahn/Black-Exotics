/**
 * signed: encrypted cookie
 * httpOnly: safe from browser manipulation
 * secure: only sent via https
 */
const cookie_options = {
    signed: true,
    // secure: true,
    httpOnly: true
}

const STAT_200 = 200
const STAT_400 = 400
const STAT_404 = 404
const auth_cookie_key = 'PASSPORT'

module.exports = {
    cookie_options, STAT_200, STAT_400, STAT_404, auth_cookie_key
}