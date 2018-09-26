const { createSession } = require("iocane");
const srs = require("secure-random-string");

const PASS_LEN_MAX = 26;
const PASS_LEN_MIN = 18;
const SPLIT_CHUNK_LOCAL = 2;
const SPLIT_CHUNK_REMOTE = 4;

function generateSecretPayload(accountSecret) {
    const lenDiff = Math.floor(Math.random() * (PASS_LEN_MAX - PASS_LEN_MIN));
    const passLen = PASS_LEN_MIN + lenDiff;
    return Promise
        .resolve()
        .then(() => new Promise((resolve, reject) => {
            srs({ length: passLen }, (err, sr) => {
                if (err) {
                    return reject(err);
                }
                resolve(sr);
            });
        }))
        .then(password =>
            createSession()
                .encrypt(accountSecret, password)
                .then(encryptedPayload => ({
                    encryptedPayload,
                    password
                }))
        );
}

function splitEncryptedPayload(str) {
    const minLength = SPLIT_CHUNK_LOCAL + SPLIT_CHUNK_REMOTE;
    if (!str || str.length < minLength) {
        throw new Error(`Payload too short: Must be at least ${minLength} characters`);
    }
    let remote = "",
        local = "",
        copy = str;
    while (copy.length > 0) {
        // Take remote first
        remote = `${remote}${copy.substring(0, SPLIT_CHUNK_REMOTE)}`;
        copy = copy.substring(SPLIT_CHUNK_REMOTE);
        // Take local second
        local = `${local}${copy.substring(0, SPLIT_CHUNK_LOCAL)}`;
        copy = copy.substring(SPLIT_CHUNK_LOCAL);
    }
    return {
        local,
        remote
    };
}

module.exports = {
    generateSecretPayload,
    splitEncryptedPayload
};
