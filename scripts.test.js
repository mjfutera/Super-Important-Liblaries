const {emailValidator, passwordValidator, passwordGenerator, loginValidator} = require('./scripts');

describe("emailValidator checker", () => {
    test('Correct email', () => {
        expect(emailValidator('mojasuperfirma@gmail.com')).toBeTruthy();
    });
    test('2*@ and more - Incorrect', () => {
        expect(emailValidator('mojasuperfirma@@gmail.com')).toBeFalsy();
    });
    test('No domain extension - Incorrect', () => {
        expect(emailValidator('mojasuperfirma@gmail')).toBeFalsy();
    });
    test('Space in email - Incorrect', () => {
        expect(emailValidator('mojasuper firma@gmail.com')).toBeFalsy();
    });
}); 

describe("passwordValidator checker", () => {
    test('Correct password', async () => {
        expect(passwordValidator('yNaTccN*qnjOCZ34')).toBeTruthy();
    });
    test('Missing capital letter - Incorrect', async () => {
        expect(passwordValidator('ynatccn*qnjacz34')).toBeFalsy();
    });
    test('Missing small letter - Incorrect', async () => {
        expect(passwordValidator('YNATCCN*QNJOCZ34!')).toBeFalsy();
    });
    test('Missing numbers letter - Incorrect', async () => {
        expect(passwordValidator('SuperLongPassword!')).toBeFalsy();
    });
    test('Missing special digit - Incorrect', async () => {
        expect(passwordValidator('yNaTccNqnjOCZ34')).toBeFalsy();
    });
    test('Have spaces - Incorrect', async () => {
        expect(passwordValidator('yNaTccN* qnjOCZ34')).toBeFalsy();
    });
});

describe("Password generator", () =>{
    test('Pass passwordValidator', () => {
        expect(passwordValidator(passwordGenerator())).toBeTruthy();
    });
});

describe("Login validator", () => {
    test("Correct login", () => {
        expect(loginValidator('mjfutera')).toBeTruthy();
    });
    test("To short - Incorrect", () => {
        expect(loginValidator('mjfa')).toBeFalsy();
    });
    test("Spaces between - Incorrect", () => {
        expect(loginValidator('mj futera')).toBeFalsy();
    });
});