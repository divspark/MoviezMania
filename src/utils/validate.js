export const Dovalidate = (email,password) => {
    const isEmailValid = email => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    const isPasswordValid = password => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return re.test(String(password));
    };

    if (!isEmailValid(email)) {
        return 'Invalid email address';
    }
    if (!isPasswordValid(password)) {
        return 'Invalid password. Password must be at least 8 characters long and contain at least one number, one lowercase letter, one uppercase letter, and one special character.';
    }

    return null;
}