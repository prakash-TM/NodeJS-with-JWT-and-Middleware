const jwt = require("jsonwebtoken");
const JWTConfig = require("./config");

const signToken = (payload) => {
    const token = jwt.sign(payload, JWTConfig.JWT_KEY, {
        expiresIn: JWTConfig.EXPIRES_IN,
    });

    return token;
};

const decodeToken = (payload) => {
    const decoded = jwt.decode(payload);
    return decoded;
};

const validateSignature = async(token) => {
    try {
        const response = await jwt.verify(token, JWTConfig.JWT_KEY);
        if (!response) {
            return false;
        }
        return true;
    } catch (err) {
        return false;
    }
};

module.exports = {
    signToken,
    validateSignature,
    decodeToken,
};