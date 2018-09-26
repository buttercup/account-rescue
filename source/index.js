const { generateSecretPayload, splitEncryptedPayload } = require("./secret.js");
const { generateHTMLDocument } = require("./document.js");

function renderRescue(
    { accountIdentifier, accountSecret, output = "html" } = {},
    { system = "Example Inc." } = {}
) {
    return generateSecretPayload(accountSecret)
        .then(({ encryptedPayload, password }) => {
            const { local: localCopy, remote: remoteCopy } = splitEncryptedPayload(encryptedPayload);
            return generateHTMLDocument({
                accountIdentifier,
                password,
                payload: localCopy,
                system
            });
        });
}

renderRescue({
    accountIdentifier: "id123",
    accountSecret: "mySecretPassword"
});

module.exports = {
    renderRescue
};
