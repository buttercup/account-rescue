const { generateSecretPayload, splitEncryptedPayload } = require("./secret.js");
const { generateHTMLDocument, generatePDFDocument } = require("./document.js");
const { generateQRCodeForPayload } = require("./qrCode.js");

function renderRescue(
    { accountIdentifier, accountSecret, output = "html" } = {},
    { system = "Example Inc." } = {}
) {
    const out = {
        remote: null,
        data: null
    };
    return generateSecretPayload(accountSecret)
        .then(({ encryptedPayload, password }) => {
            const { local, remote } = splitEncryptedPayload(encryptedPayload);
            out.remote = remote;
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
// }).then(out => {
//     require("fs").writeFileSync(require("path").resolve(__dirname, "../test.pdf"), out.data);
// });

module.exports = {
    renderRescue
};
