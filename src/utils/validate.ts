import { ValidateType } from '@/configs/types';

const Validate = {
    isBlank(value: string): boolean {
        return value.trim().length <= 0;
    },

    isNotBlank(value: string): boolean {
        return value.trim().length > 0;
    },

    username(value: string, max = 16): ValidateType {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (this.isBlank(value)) return { message: 'Username is not blank ', error: true };

        if (value.length > max) return { message: `Username must be less than ${max} characters`, error: true };

        if (specialChars.test(value)) return { message: 'Username is not include special characters ', error: true };

        return { message: '', error: false };
    },

    password(value: string, min = 6): ValidateType {
        const valueTrim = value.trim();

        if (valueTrim.length <= 0) return { message: 'Password is not blank ', error: true };

        if (valueTrim.length < min) return { message: `Password must be longer than ${min} characters`, error: true };

        return { message: '', error: false };
    },

    isPassword(value: string, min = 6): ValidateType {
        const valueTrim = value.trim();

        if (valueTrim.length <= 0) return { message: 'Password is not blank ', error: true };

        if (valueTrim.length < min) return { message: `Password must be longer than ${min} characters`, error: true };

        return { message: '', error: false };
    },
};

export default Validate;
