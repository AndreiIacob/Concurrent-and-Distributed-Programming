export default class Validator {

    constructor(type, expression, message) {
        this.type = type;
        this.message = message;
        this.expression = expression;
    }

    validate(newValue) {
        switch (this.type) {
            case "regex":
                if (this.expression.exec(newValue) !== null) {
                    this.expression.lastIndex = 0;
                    return true;
                }
                return false;
            default:
        }
    }

    static setCustomValidator(message, validationFunction) {
        let validator = new Validator("custom", null, message);
        validator.validate = function (newValue) {
            return validationFunction(newValue);
        };
        return validator;
    }

    static fromDescription(description) {
        return new Validator(description.type, description.expression, description.message)
    }
}
