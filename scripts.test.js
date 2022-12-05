const {
    emailValidator, 
    passwordValidator, 
    passwordGenerator, 
    loginValidator,
    polishPostCodeVerifier,
    polishPostCodeModifier,
    dutchPostCodeVerifier,
    dutchPostCodeModifier} = require('./scripts');

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
        expect(passwordValidator(passwordGenerator())).toBeTruthy();
        expect(passwordValidator(passwordGenerator())).toBeTruthy();
        expect(passwordValidator(passwordGenerator())).toBeTruthy();
        expect(passwordValidator(passwordGenerator())).toBeTruthy();
        expect(passwordValidator(passwordGenerator())).toBeTruthy();
        expect(passwordValidator(passwordGenerator())).toBeTruthy();
        expect(passwordValidator(passwordGenerator())).toBeTruthy();
        expect(passwordValidator(passwordGenerator())).toBeTruthy();
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
describe("polishPostCodeVerifier checker", () => {
    test("33-100 to by truthy", () => {
        expect(polishPostCodeVerifier('33-100')).toBeTruthy();
    })
    test("33100 to by truthy", () => {
        expect(polishPostCodeVerifier('33100')).toBeTruthy();
    })
    test("33 100 to by falsy", () => {
        expect(polishPostCodeVerifier('33 100')).toBeFalsy();
    })
    test("331000 to by falsy", () => {
        expect(polishPostCodeVerifier('331000')).toBeFalsy();
    })
})
describe("polishPostCodeModifier checker", () => {
    test("33-100 -> 33-100", () => {
        expect(polishPostCodeModifier('33-100')).toBe('33-100');
    })
    test("33100 -> 33-100", () => {
        expect(polishPostCodeModifier('33100')).toBe('33-100');
    })
})
describe("dutchPostCodeVerifier checker", () => {
    test("2021EB to by truthy", () => {
        expect(dutchPostCodeVerifier('2021EB')).toBeTruthy();
    })
    test("2021 EB to by truthy", () => {
        expect(dutchPostCodeVerifier('2021 EB')).toBeTruthy();
    })
    test("20211eb to by falsy", () => {
        expect(dutchPostCodeVerifier('20211eb')).toBeFalsy();
    })
    test("2021eeb to by falsy", () => {
        expect(dutchPostCodeVerifier('2021eeb')).toBeFalsy();
    })
    test("2021  EB to by falsy", () => {
        expect(dutchPostCodeVerifier('2021  EB')).toBeFalsy();
    })
})
describe("dutchPostCodeModifier checker", () => {
    test("2021eb -> 2021EB", () => {
        expect(dutchPostCodeModifier('2021eb')).toBe('2021EB');
    })
    test("2021 eb -> 2021EB", () => {
        expect(dutchPostCodeModifier('2021 eb')).toBe('2021EB');
    })
})