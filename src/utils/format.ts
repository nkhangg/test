import moment from 'moment';

const floor = Math.floor,
    abs = Math.abs,
    log = Math.log,
    round = Math.round,
    min = Math.min;
const abbrev = ['K', 'Mil', 'Bil']; // abbreviations in steps of 1000x; extensible if need to edit

export const toCurrency = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
        .format(price)
        .replace('₫', 'VND');
};

export const stringToUrl = (string: string) => {
    return string.toLowerCase().replaceAll(' ', '-');
};

export const toFromNow = (time: string) => {
    return moment(time, 'DDMMYYYY h:mm:ss a').fromNow();
};

export const toFullname = (firstName: string | null, lastName: string | null, email: string) => {
    if (!firstName || !lastName) return email;

    return `${firstName} ${lastName}`;
};

function rnd(n: number, precision: number) {
    const prec = 10 ** precision;
    return round(n * prec) / prec;
}

export function toAbbrevNumber(n: number) {
    let base = floor(log(abs(n)) / log(1000));
    const suffix = abbrev[min(abbrev.length - 1, base - 1)];
    base = abbrev.indexOf(suffix) + 1;
    return suffix ? rnd(n / 1000 ** base, 2) + suffix : '' + n;
}

export function capitalize(value: string) {
    const words = value.split(' ');

    return words
        .map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        })
        .join(' ');
}

export const toGam = (value: number) => {
    return value < 1000 ? value + 'g' : (value / 1000).toFixed(0) + 'kg';
};

export const urlToString = (value: string) => {
    return value.replaceAll('-', ' ');
};

export const fileToUrl = (file: File, callback?: (url: string) => void) => {
    const urlObj = URL.createObjectURL(file);
    if (callback) {
        callback(urlObj);
    }
    return urlObj;
};

export function dataURLtoFile(dataurl: string) {
    let arr = dataurl.split(',');
    let afterMine = arr[0].match(/:(.*?);/);
    if (!afterMine?.length) return;
    let mine: string = afterMine[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'avartar.png', { type: mine });
}
