const {emailValidator, getData, passwordValidator, passwordGenerator, loginValidator} = require('./scripts');

describe("emailValidator checker", () => {
    test('Correct email', () => {
        expect(emailValidator('mojasuperfirma@gmail.com')).toBeTruthy();
    });
    test('2*@ and more - incorrect', () => {
        expect(emailValidator('mojasuperfirma@@gmail.com')).toBeFalsy();
    });
    test('No domain extension - incorrect', () => {
        expect(emailValidator('mojasuperfirma@gmail')).toBeFalsy();
    });
    test('Space in email - incorrect', () => {
        expect(emailValidator('mojasuper firma@gmail.com')).toBeFalsy();
    });
}); 

describe("passwordValidator checker", () => {
    test('Correct password', async () => {
        expect(passwordValidator('9MZ6d5123!')).toBeTruthy();
    });
    test('Missing capital letter - Incorrect', async () => {
        expect(passwordValidator('9mz6d5123!')).toBeFalsy();
    });
    test('Missing small letter - Incorrect', async () => {
        expect(passwordValidator('9MZ6D5123!')).toBeFalsy();
    });
    test('Missing numbers letter - Incorrect', async () => {
        expect(passwordValidator('SuperLongPassword!')).toBeFalsy();
    });
    test('Missing special digit - Incorrect', async () => {
        expect(passwordValidator('9MZ6D5123a')).toBeFalsy();
    });
    test('Have spaces - Incorrect', async () => {
        expect(passwordValidator('9MZ6D5123a')).toBeFalsy();
    });
});

describe("Password generator", () =>{
    test('Pass passwordValidator', () => {
        expect(passwordValidator(passwordGenerator())).toBeTruthy();
    });
});

describe.only("Login validator", () => {
    test("Correct login", () => {
        expect(loginValidator('mjfutera')).toBeTruthy();
    });
    test("Correct login", () => {
        expect(loginValidator('mjfutera')).toBeTruthy();
    });
});

describe("API tester", () => {
    test('JokeAPI', async () => {
        const joke = await getData('https://jokeapi.mjblog.ovh/');
        expect(joke['API_Owner']).toBe('Michal Futera');
    });
});