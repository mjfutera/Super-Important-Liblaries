const getData = async (url) => await fetch(url).then(r => r.json());

const emailValidator = email => {
    reg =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (email.length>0 && reg.test(email.toLowerCase()));
};