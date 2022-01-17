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



module.exports = {
    signToken,

    decodeToken
};