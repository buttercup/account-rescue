const { generateSecretPayload, splitEncryptedPayload } = require("./secret.js");
const { generateHTMLDocument } = require("./document.js");
const { generateQRCodeForPayload } = require("./qrCode.js");

function renderRescue(
    { accountIdentifier, accountSecret, output = "html" } = {},
    { system = "Example Inc." } = {}
) {
    const output = {
        remote: null,
        data: null
    };
    return generateSecretPayload(accountSecret)
        .then(({ encryptedPayload, password }) => {
            const { local, remote } = splitEncryptedPayload(encryptedPayload);
            output.remote = remote;
            return generateQRCodeForPayload({
                id: accountIdentifier,
                payload: local,
                password
            }).then(qrImageCode =>
                generateHTMLDocument({
                    accountIdentifier,
                    password,
                    payload: local,
                    qrImageCode,
                    system
                })
            );
        })
        .then(html => {
            output.data = html;
        })
        .then(() => output);
}

renderRescue({
    accountIdentifier: "id123",
    accountSecret: "mySecretPassword"
});

module.exports = {
    renderRescue
};
