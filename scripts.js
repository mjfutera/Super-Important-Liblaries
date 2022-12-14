const getData = async (url) => await fetch(url).then(r => r.json());

const emailValidator = email => {
    reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (email.length > 0 && reg.test(email.toLowerCase()));
};

const loginValidator = login => {
    reg = /^[A-Za-z][A-Za-z0-9_!]{6,29}$/i;
    return reg.test(login);
};

const loginLengthValidator = login => {
    return (login.length > 6);
}

const passRegEx = {
    "length": 7,
    "capitalLetters": /[A-Z]/,
    "smallLetters": /[a-z]/,
    "numbers": /\d/,
    "specialDigits": /[!@#$%^&*()]/,
    "noSpaces": /[ ]/
}

const passwordValidator = pass => {
    const length = (pass.length > passRegEx['length']);
    const capitalLetters = passRegEx['capitalLetters'].test(pass);
    const smallLetters = passRegEx['smallLetters'].test(pass);
    const numbers = passRegEx['numbers'].test(pass);
    const specialDigits = passRegEx['specialDigits'].test(pass);
    const noSpaces = !passRegEx['noSpaces'].test(pass);
    return (length && capitalLetters && smallLetters && numbers && specialDigits && noSpaces);
}

const passwordGenerator = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 15;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}

const isEmailOk = async (emailField, replyField) => {
    const email = document.getElementById(emailField).value;
    if (!emailValidator(email)) {
        document.getElementById(replyField).innerHTML = '';
        document.getElementById(replyField).innerHTML = 'Incorrect email';
        exit();
    } else {
        document.getElementById(replyField).innerHTML = '';
        const emailInDB = await getData(`regcheck.php?email=${email}`);
        if (emailInDB.email === true) {
            document.getElementById(replyField).innerHTML = 'Email already in Data Base';
            exit();
        } else if (emailInDB.email === false) {
            document.getElementById(replyField).innerHTML = 'Email available';
            exit();
        }
    }
}

const isLoginOK = async (loginField, replyField) => {
    const login = document.getElementById(loginField).value;
    if (!loginLengthValidator(login)) {
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
        } else if (loginInDB.login === false) {
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
        document.getElementById(replyField + "-1").style.color = "green";
        document.getElementById(replyField + "-1").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField + "-1").style.color = "red";
        document.getElementById(replyField + "-1").style.textDecoration = "none";
    }
    if (passRegEx['capitalLetters'].test(password)) {
        document.getElementById(replyField + "-2").style.color = "green";
        document.getElementById(replyField + "-2").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField + "-2").style.color = "red";
        document.getElementById(replyField + "-2").style.textDecoration = "none";
    }
    if (passRegEx['smallLetters'].test(password)) {
        document.getElementById(replyField + "-3").style.color = "green";
        document.getElementById(replyField + "-3").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField + "-3").style.color = "red";
        document.getElementById(replyField + "-3").style.textDecoration = "none";
    }
    if (passRegEx['numbers'].test(password)) {
        document.getElementById(replyField + "-4").style.color = "green";
        document.getElementById(replyField + "-4").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField + "-4").style.color = "red";
        document.getElementById(replyField + "-4").style.textDecoration = "none";
    }
    if (passRegEx['specialDigits'].test(password)) {
        document.getElementById(replyField + "-5").style.color = "green";
        document.getElementById(replyField + "-5").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField + "-5").style.color = "red";
        document.getElementById(replyField + "-5").style.textDecoration = "none";
    }
    if (!passRegEx['noSpaces'].test(password)) {
        document.getElementById(replyField + "-6").style.color = "green";
        document.getElementById(replyField + "-6").style.textDecoration = "line-through";
    } else {
        document.getElementById(replyField + "-6").style.color = "red";
        document.getElementById(replyField + "-6").style.textDecoration = "none";
    }
}

const timer = (date, replyField) => {
    const myDate = new Date(date);
    const innerCalc = () => {
        const userDate = new Date();
        if (userDate < myDate) {
            const difference = myDate - userDate;
            // const months = 
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            document.getElementById(replyField).innerHTML = `${days} days, 
            ${hours} hrs, ${minutes} min, ${seconds} sec`;
        } else {
            document.getElementById(replyField).innerHTML = "after term";
        }
        setTimeout(innerCalc, 1000);
    }
    innerCalc();
}

const sendRegistration = async () => {
    const email = document.getElementById("email").value;
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    const password1 = document.getElementById("password1").value;
    const emailInDB = await getData(`regcheck.php?email=${email}`);
    const loginInDB = await getData(`regcheck.php?login=${login}`);
    if (emailValidator(email) && !emailInDB.email && loginValidator(login) && !loginInDB.login && passwordValidator(password) && secondPasswordValidator(password, password1)) {
        document.getElementById("registration").submit();
    } else {
        alert(`check fields again, please`);
    }
}

const seePassword = (passField1, passField2) => {
    const field1 = document.getElementById(passField1).getAttribute("type");
    if (field1 === "password") {
        document.getElementById(passField1).setAttribute("type", "text");
        document.getElementById(passField2).setAttribute("type", "text");
    } else {
        document.getElementById(passField1).setAttribute("type", "password");
        document.getElementById(passField2).setAttribute("type", "password");
    }
}

const copyToClipboard= field => {
    const copyText = document.getElementById(field);
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
    alert("Copied the text: " + copyText.value);
  }

  const polishPostCodeVerifier = postcode => {
    const reg1 = /^\d{2}-\d{3}$/;
    const reg2 = /^\d{5}$/;
    return (reg1.test(postcode) || reg2.test(postcode));
}

const polishPostCodeModifier = postcode => {
    if(/^\d{5}$/.test(postcode)){
        postcode = postcode.split('');
        return `${postcode[0]}${postcode[1]}-${postcode[2]}${postcode[3]}${postcode[4]}`;
    }
    return postcode;
}

const dutchPostCodeVerifier = postcode => {
    return /^\d{4} ?[a-zA-Z]{2}$/.test(postcode);
}

const dutchPostCodeModifier = postcode => {
    postcode = postcode.toUpperCase();
    if(/ /.test(postcode)){
        postcode = postcode.split(''); 
        postcode.splice(4, 1);
        return postcode.join('');
    }
    return postcode;
}

// Dodatki od Bartka

// const mysql = require('mysql'); // 

// const GetDataLikeBartekSaid = (db_details, sql, callback) => {
//     const connection = mysql.createConnection(db_details);
//     connection.connect();
//     connection.query(sql, callback);
//     connection.end();
// }

// const DataFromDB = (db_details, sql) => {
//     const mysql      = require('mysql'); // 
//     const connection = mysql.createConnection(db_details);
//     connection.connect();
//     connection.query(sql, function (error, results, fields) {
//       if (error) throw error;
//       const data = results;
//       return data;
//     });
//     connection.end();
//     return data;
// }

module.exports = {
    loginLengthValidator,
    emailValidator,
    passwordValidator,
    passwordGenerator,
    loginValidator,
    polishPostCodeVerifier,
    polishPostCodeModifier,
    dutchPostCodeVerifier,
    dutchPostCodeModifier
}
