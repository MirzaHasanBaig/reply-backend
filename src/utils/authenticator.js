const speakeasy = require('speakeasy');

/**
 * Generates a new authenticator secret.
 * @returns {object} The secret and its QR code URL.
 */
function generateAuthenticatorSecret() {
    const secret = speakeasy.generateSecret({ length: 20 });
    return {
        secret: secret.base32,
        otpauth_url: secret.otpauth_url
    };
}

/**
 * Verifies a given token against the stored secret.
 * @param {string} secret - The base32 encoded secret.
 * @param {string} token - The TOTP token provided by the user.
 * @returns {boolean} Whether the token is valid or not.
 */
function verifyToken(secret, token) {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 1 // Allows slight time drift
    });
}

module.exports = { generateAuthenticatorSecret, verifyToken };
