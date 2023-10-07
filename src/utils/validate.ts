const Validate = {
    isPassword(value: string, min = 6) {
        const valueTrim = value.trim();

        if (valueTrim.length <= 0) return false;

        if (valueTrim.length < min) return false;

        return true;
    },
};

export default Validate;
