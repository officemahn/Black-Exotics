const {generateAccessToken, get_hashed_password, get_decoded_data, isSamePassword} = require('../../../src/util/authLib')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

describe('Access token generation', () => {
    test(`Admin token gen with invalid object: Expecting undefined`, () => {
      expect(generateAccessToken(undefined, undefined, true)).toBeUndefined();
    });
    test(`Admin token gen with valid object: Expecting a token`, () => {
        expect(generateAccessToken(1, 'tokengen@blackexotics.test', true)).not.toBeUndefined();
    });
    test(`Admin token gen with invalid type object: Expecting a token`, () => {
        expect(generateAccessToken(1, 'tokengen@blackexotics.test', undefined)).toBeUndefined();
    });
    test(`User token gen with invalid object: Expecting undefined`, () => {
        expect(generateAccessToken(undefined, undefined, false)).toBeUndefined();
    });
    test(`User token gen with valid object: Expecting a token`, () => {
          expect(generateAccessToken(1, 'tokengen@blackexotics.test', false)).not.toBeUndefined();
    });
    test(`User token gen with invalid type object: Expecting a token`, () => {
        expect(generateAccessToken(1, 'tokengen@blackexotics.test', undefined)).toBeUndefined();
    });
});

describe('Password Encryption', () => {
    test(`Encrypt password: Expecting a hash`, async () => {
        expect(await get_hashed_password('A valid password 123')).not.toBeUndefined();
    });
    test(`Encrypt undefined password: Expecting undefined`, async () => {
        expect(await get_hashed_password(undefined)).toBeUndefined();
    });
});

describe('Token Decryption', () => {
    let test_obj = {'id': 1, 'email':'email@test.ca', 'role':'admin'}
    let token = jwt.sign(test_obj, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_LIFESPAN})
    test(`Encrypt password: Expecting a hash`, async () => {
        expect(await get_decoded_data(token)).not.toBeUndefined();
    });
    test(`Encrypt undefined password: Expecting undefined`, async () => {
        expect(await get_decoded_data(undefined)).toBeUndefined();
    });
    test(`Encrypt undefined password: Expecting undefined`, async () => {
        result = await get_decoded_data(token);
        expect(result['id']).toBe(test_obj['id'])
        expect(result['email']).toBe(test_obj['email'])
        expect(result['role']).toBe(test_obj['role'])
    });
});

describe('Password Comparison', () => {
    let password = 'testing123HASH'
    let wrong_password = 'testingWrongPassword123HASH'
    test(`Compare encrypted password with correct password: Expecting True`, async () => {
        let hash = await bcrypt.hash(password, 10)
        expect(await isSamePassword(password, hash)).toBeTruthy();
    });
    test(`Compare encrypted password with wrong password: Expecting False`, async () => {
        let hash = await bcrypt.hash(password, 10)
        expect(await isSamePassword(wrong_password, hash)).toBeFalsy();
    });
    test(`Compare password with undefined: Expecting False`, async () => {
        expect(await isSamePassword(password, undefined)).toBeFalsy();
    });
    test(`Compare password with encrypted password (reverse params): Expecting False`, async () => {
        let hash = await bcrypt.hash(password, 10)
        expect(await isSamePassword(hash, password)).toBeFalsy();
    });
});
