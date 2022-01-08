const { validate_email, validate_password, validate_name  } = require('../../../src/util/validator');

/*** Testing Email Verification */

const valid_emails = ['testemail@email.com']
const invalid_emails = [212121]
describe.each(valid_emails)
  ('Validating valid emails', (email) => {
    test(`Validating '${email}': Expecting True`, () => {
      expect(validate_email(email)).toBeTruthy();
    });
  });

describe.each(invalid_emails)
  ('Validating invalid emails', (email) => {
    test(`Validating '${email}': Expecting False`, () => {
      expect(validate_email(email)).toBeFalsy();
    });
  });

  /*** Testing Password Verification */

  const valid_passwords = ['BlackExoticsTESTPassword2022!..']
  const invalid_passwords = [212121, '.', 'password', 'qwerty']

  describe.each(valid_passwords)
  ('Validating valid passwords:', (password) => {
    test(`Validating '${password}': Expecting True`, () => {
      expect(validate_password(password)).toBeTruthy();
    });
  });

describe.each(invalid_passwords)
  ('Validating invalid passwords:', (password) => {
    test(`Validating '${password}': Expecting False`, () => {
      expect(validate_password(password)).toBeFalsy();
    });
  });

  /*** Testing Password Verification */

const valid_names = ['Obinna', 'David', 'Ngozi']
const invalid_names = ['BlackExoticsTESTPassword2022!..', '.', 'U', '']

describe.each(valid_names)
('Validating valid names:', (name) => {
  test(`Validating '${name}': Expecting True`, () => {
    expect(validate_name(name)).toBeTruthy();
  });
});

describe.each(invalid_names)
('Validating invalid names:', (name) => {
  test(`Validating '${name}': Expecting False`, () => {
    expect(validate_name(name)).toBeFalsy();
  });
});