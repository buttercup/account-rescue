const path = require("path");
const fs = require("fs");
const pug = require("pug");
const pdf = require("html-pdf");

// const PDF_OPTIONS = {
//     format: "A4",
//     orientation: "portrait",
//     renderDelay: 2000
// };
const TEMPLATE = path.resolve(__dirname, "../resources/template.pug");

function generateHTMLDocument({ accountIdentifier, colour, password, payload, qrImageCode, system, url } = {}) {
    return readTemplate()
        .then(pugCode => {
            const pugEx = pug.compile(pugCode);
            const html = pugEx({
                accountIdentifier,
                colour,
                password,
                payload,
                qrImageCode,
                system,
                url
            });
            return html;
        });
}

function generatePDFDocument(html) {
    return new Promise((resolve, reject) => {
        pdf.create(html).toBuffer((err, buffer) => {
            if (err) {
                return reject(err);
            }
            resolve(buffer);
        });
    });
}

function readTemplate() {
    return new Promise((resolve, reject) => {
        fs.readFile(TEMPLATE, "utf8", (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}

module.exports = {
    generateHTMLDocument,
    generatePDFDocument
};
