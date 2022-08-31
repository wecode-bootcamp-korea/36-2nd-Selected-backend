const AppError = require('../middlewares/appError');

const validateNumberType = (num) => {
    const re = new RegExp(/^[0-9]*$/);

    if (!re.test(num)) throw new AppError("INVALID_DATA", 409);
}

module.exports = {
    validateNumberType
}