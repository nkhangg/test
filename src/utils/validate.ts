import { ValidateType } from '@/configs/types';

const Validate = {
    isBlank(value: string): boolean {
        return value.trim().length <= 0;
    },

    isNotBlank(value: string): boolean {
        return value.trim().length > 0;
    },

    isSpecialChars(value: string): boolean {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(value);
    },

    isEmail(value: string): boolean {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return re.test(value);
    },

    isNumber(value: string): boolean {
        const num = /^\d+$/;

        return num.test(value);
    },

    isPhone(value: string): boolean {
        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

        return regexPhoneNumber.test(value);
    },

    isValidBirthday(value: string, maxAge = 14): boolean {
        const age = new Date().getFullYear() - new Date(value).getFullYear() < maxAge;

        return age;
    },

    description(value: string): ValidateType {
        if (this.isBlank(value)) return { message: `Description is invalid `, error: true };
        return { message: '', error: false };
    },

    number(value: string | number, name?: string): ValidateType {
        if (!this.isNumber(value.toString())) return { message: `${name} is invalid `, error: true };

        if (Number.parseInt(value.toString()) <= 0) return { message: `${name} is invalid `, error: true };

        return { message: '', error: false };
    },

    infomation(value: string | any[], name?: string | (() => void)): ValidateType {
        const callName = typeof name === 'function' ? name() : name;

        if (typeof value === 'object') {
            if (value.length <= 0) return { message: `${callName} can't be blank `, error: true };
        } else {
            if (this.isBlank(value)) return { message: `${callName} can't be blank `, error: true };

            if (this.isNumber(value.toString())) return { message: `${callName} is not numberic `, error: true };

            if (this.isSpecialChars(value)) return { message: `${callName}  is not include special characters `, error: true };
        }

        return { message: '', error: false };
    },

    username(value: string, max = 16): ValidateType {
        if (this.isBlank(value)) return { message: "Username can't be blank ", error: true };

        if (this.isNumber(value)) return { message: 'Username is not numberic ', error: true };

        if (value.length > max)
            return {
                message: `Username must be less than ${max} characters`,
                error: true,
            };

        if (this.isSpecialChars(value))
            return {
                message: 'Username is not include special characters ',
                error: true,
            };

        return { message: '', error: false };
    },

    password(value: string, min = 6): ValidateType {
        const valueTrim = value.trim();

        if (valueTrim.length <= 0) return { message: "Password can't be blank ", error: true };

        if (valueTrim.length < min)
            return {
                message: `Password must be longer than ${min} characters`,
                error: true,
            };

        return { message: '', error: false };
    },

    email(value: string): ValidateType {
        if (this.isBlank(value)) return { message: "Email can't be blank ", error: true };

        if (!this.isEmail(value))
            return {
                message: 'Email is invalid, please try an other email ',
                error: true,
            };

        return { message: '', error: false };
    },

    gender(value: string): ValidateType {
        if (this.isBlank(value)) return { message: "Gender can't be blank ", error: true };

        return { message: '', error: false };
    },

    fullname(value: string): ValidateType {
        if (this.isBlank(value)) return { message: "Fullname can't be blank ", error: true };

        if (this.isSpecialChars(value))
            return {
                message: "Fullname can't include special characters ",
                error: true,
            };

        return { message: '', error: false };
    },
    address(value: string): ValidateType {
        if (this.isBlank(value)) return { message: "Address can't be blank ", error: true };

        return { message: '', error: false };
    },

    birthday(value: string): ValidateType {
        if (this.isBlank(value)) return { message: "Birthday can't be blank ", error: true };
        if (this.isValidBirthday(value)) return { message: 'You are not old enough to use the service ', error: true };

        return { message: '', error: false };
    },

    phone(value: string): ValidateType {
        if (this.isBlank(value)) return { message: "Phone number can't be blank ", error: true };

        if (!this.isPhone(value)) return { message: 'Phone number invalid ', error: true };
        return { message: '', error: false };
    },

    avatar(value: string): ValidateType {
        return { message: '', error: false };
    },

    confirmPassword(value: string, password?: string): ValidateType {
        if (this.isBlank(value)) return { message: "Password Confirm can't be blank ", error: true };

        const validPass = this.password(value);

        if (validPass.error) return validPass;

        if (password !== value)
            return {
                message: 'Password Confirm is not match with the password',
                error: true,
            };

        return { message: '', error: false };
    },
};

export default Validate;
