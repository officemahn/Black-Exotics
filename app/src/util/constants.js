/**
 * signed: encrypted cookie
 * httpOnly: can't be read via JS
 * secure: only sent via https
 */
const cookie_options = {
    signed: true,
    // secure: true,
}

const STAT_200 = 200
const STAT_400 = 400
const STAT_404 = 404
const auth_cookie_key = 'PASSPORT'

module.exports = {
    cookie_options, STAT_200, STAT_400, STAT_404, auth_cookie_key
}