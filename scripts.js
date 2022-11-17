const getData = async (url) => await fetch(url).then(r => r.json());

const emailValidator = email => {
    reg =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (email.length>0 && reg.test(email.toLowerCase()));
};

const loginValidator = login => {
    reg =  /^[A-Za-z][A-Za-z0-9_!]{6,29}$/i;
    return reg.test(login);
};

const loginLengthValidator = login => {
    return (login.length>6);
}

const passRegEx = {
    "length" : 7,
    "capitalLetters" : /[A-Z]/,
    "smallLetters" : /[a-z]/,
    "numbers" : /\d/,
    "specialDigits" : /[!@#$%^&*()]/,
    "noSpaces" : /[ ]/
}

const passwordValidator = pass => {
    const length = (pass.length > passRegEx['length']);
    const capitalLetters = passRegEx['capitalLetters'].test(password);
    const smallLetters = passRegEx['smallLetters'].test(password);
    const numbers = passRegEx['numbers'].test(password);
    const specialDigits = passRegEx['specialDigits'].test(password);
    const noSpaces = !passRegEx['noSpaces'].test(password);
    return (length && capitalLetters && smallLetters && numbers && specialDigits && noSpaces);
}

const generatePassword = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 15;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber +1);
    }
    return password;
 }

 const isEmailOk = async (emailField, replyField) => {
    const email = document.getElementById(emailField).value;
    if(!emailValidator(email)) {
        document.getElementById(replyField).innerHTML = '';
        document.getElementById(replyField).innerHTML = 'Incorrect email';
        exit();
    } else {
        document.getElementById(replyField).innerHTML = '';
        const emailInDB = await getData(`regcheck.php?email=${email}`);
        if (emailInDB.email === true) {
            document.getElementById(replyField).innerHTML = 'Email already in Data Base';
            exit();
        } else if (emailInDB.email === false){
            document.getElementById(replyField).innerHTML = 'Email available';
            exit();
        }
    }
 }

 const isLoginOK = async (loginField, replyField) => {
    const login = document.getElementById(loginField).value;
    if(!loginLengthValidator(login)) {
        document.getElementById(replyField).innerHTML = '';
        document.getElementById(replyField).innerHTML = 'Incorrect login. Login have to be at lest than 7 characters.';
        exit();
    } else if (!loginValidator(login)) {
        document.getElementById(replyField).innerHTML = '';
        document.getElementById(replyField).innerHTML = 'Incorrect login.  You can use only letters, numbers, underscore and esclamation mark.';
        exit();
    } else {
        document.getElementById(replyField).innerHTML = '';
        const loginInDB = await getData(`regcheck.php?login=${login}`);
        if (loginInDB.login === true) {
            document.getElementById(replyField).innerHTML = 'Login already in Data Base';
            exit();
        } else if (loginInDB.login === false){
            document.getElementById(replyField).innerHTML = 'Login available';
            exit();
        }
    }
 }

 const isPasswordOk = (passwordField, replyField) => {
    const password = document.getElementById(passwordField).value;
    document.getElementById(replyField).innerHTML = `
    <ul>
        <li id="${replyField}-1">Must have at least 8 characters length. </li>
        <li id="${replyField}-2">Must have at least 1 capital letter. </li>
        <li id="${replyField}-3">Must have at least 1 small letter. </li>
        <li id="${replyField}-4">Must have at least 1 number. </li>
        <li id="${replyField}-5">Should have at least 1 of this digits: !@#$%^&*()</li>
        <li id="${replyField}-6">No empty spaces.</li>
    </ul>
    `;
    if (passRegEx['length'] < password.length) {
        document.getElementById(replyField+"-1").style.color = "green";
        document.getElementById(replyField+"-1").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField+"-1").style.color = "red";
        document.getElementById(replyField+"-1").style.textDecoration = "none";
    }
    if (passRegEx['capitalLetters'].test(password)) {
        document.getElementById(replyField+"-2").style.color = "green";
        document.getElementById(replyField+"-2").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField+"-2").style.color = "red";
        document.getElementById(replyField+"-2").style.textDecoration = "none";
    }
    if (passRegEx['smallLetters'].test(password)) {
        document.getElementById(replyField+"-3").style.color = "green";
        document.getElementById(replyField+"-3").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField+"-3").style.color = "red";
        document.getElementById(replyField+"-3").style.textDecoration = "none";
    }
    if (passRegEx['numbers'].test(password)) {
        document.getElementById(replyField+"-4").style.color = "green";
        document.getElementById(replyField+"-4").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField+"-4").style.color = "red";
        document.getElementById(replyField+"-4").style.textDecoration = "none";
    }
    if (passRegEx['specialDigits'].test(password)) {
        document.getElementById(replyField+"-5").style.color = "green";
        document.getElementById(replyField+"-5").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField+"-5").style.color = "red";
        document.getElementById(replyField+"-5").style.textDecoration = "none";
    }
    if (!passRegEx['noSpaces'].test(password)) {
        document.getElementById(replyField+"-6").style.color = "green";
        document.getElementById(replyField+"-6").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField+"-6").style.color = "red";
        document.getElementById(replyField+"-6").style.textDecoration = "none";
    }
 }
