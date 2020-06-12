const { decryptPayload, generateSecretPayload, unzipEncryptedPayload, zipEncryptedPayload } = require("./secret.js");
const { generateHTMLDocument, generatePDFDocument } = require("./document.js");
const { decodeQRCodePayload, generateQRCodeForPayload } = require("./qrCode.js");

/**
 * @module AccountRescue
 */

/**
 * Regenerate secret value from rescue components
 * @param {String} remote The remote payload
 * @param {String} local The local payload, taken from the QR
 * @param {String} password The local password, taken from the rescue document
 * @returns {Promise.<String>} A promise that resolves with the original
 *  secret value
 */
function regenerateSecret(remote, local, password) {
    const encryptedPayload = zipEncryptedPayload(remote, local);
    return decryptPayload(encryptedPayload, password);
}

/**
 * @typedef {Object} RenderRescueOptions
 * @property {String} accountIdentifier - The account identification value (ID,
 *  username etc.)
 * @property {String} accountSecret - The secret value to encrypt, which will
 *  be made available when consuming the rescue information
 * @property {String} output - Type of output - either "html" (string) or
 *  "pdf" (buffer)
 */

/**
 * @typedef {Object} RenderRescueTemplateProperties
 * @property {String=} system - The name of the system
 * @property {String=} url - The URL for the user to browse to in the event
 *  they want to recover their account
 */

/**
 * @typedef {Object} AccountRescueInfo
 * @property {String|Buffer} data - Resulting data (PDF/HTML)
 * @property {String} remote - Remote secret
 */

/**
 * Render a rescue document
 * @param {RenderRescueOptions} options
 * @param {RenderRescueTemplateProperties=} macros
 * @returns {Promise.<AccountRescueInfo>} Account rescue data
 */
function renderRescue(
    { accountIdentifier, accountSecret, output = "html" } = {},
    { colour = "#f46242", system = "Example Inc.", url } = {}
) {
    const out = {
        remote: null,
        data: null
    };
    return generateSecretPayload(accountSecret)
        .then(({ encryptedPayload, password }) => {
            const { local, remote } = unzipEncryptedPayload(encryptedPayload);
            out.remote = remote;
            return generateQRCodeForPayload({
                id: accountIdentifier,
                payload: local,
                password
            }).then(qrImageCode =>
                generateHTMLDocument({
                    accountIdentifier,
                    colour,
                    password,
                    payload: local,
                    qrImageCode,
                    system,
                    url
                })
            );
        })
        .then(html => {
            out.data = html;
            if (output === "pdf") {
                return generatePDFDocument(html).then(pdfBuff => {
                    out.data = pdfBuff;
                });
            }
        })
        .then(() => out);
}

// renderRescue({
//     accountIdentifier: "id123",
//     accountSecret: "mySecretPassword",
//     output: "pdf"
// }, {
//     colour: "rgb(0, 183, 172)",
//     url: "https://myserver.com/accounts/help/rescue.aspx?uid=123",
//     system: "My Buttercup"
// }).then(out => {
//     require("fs").writeFileSync(require("path").resolve(__dirname, "../test.pdf"), out.data);
// });

module.exports = {
    decodeQRCodePayload,
    regenerateSecret,
    renderRescue
};
