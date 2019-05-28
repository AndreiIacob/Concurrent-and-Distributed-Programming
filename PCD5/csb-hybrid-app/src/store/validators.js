export const REGEX_CONFIG = {
    url: /^(ftp|http|https):\/\/([\d*\w*]*(\.))+[\d*\w*]+(:\d*)?$/gmi
};

export function validateWithRegex(str, regex) {
    const regexValidator = new RegExp(regex);
    return regexValidator.test(str);
}