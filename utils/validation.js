export const validateEmail = (email) => {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regExp.test(email);
};

export const validatePassword = (password) => {
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    return regExp.test(password);
};

export const isCorrectPhone = (phone) => {
    return phone.replace(/\s/g, '').length === 12 && phone.startsWith('+371');
};

export const isCorrectDisplayName = (name) => {
    const re=new RegExp('^[a-zA-Zа-яА-Я]+$');

    return name.length > 2 && re.test(name);
};
