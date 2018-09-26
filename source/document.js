const path = require("path");
const fs = require("fs");
const pug = require("pug");

const TEMPLATE = path.resolve(__dirname, "../resources/template.pug");

function generateHTMLDocument({ accountIdentifier, password, payload, system } = {}) {
    return readTemplate()
        .then(pugCode => {
            const pugEx = pug.compile(pugCode);
            const html = pugEx({
                accountIdentifier,
                password,
                payload,
                system
            });
            fs.writeFileSync(path.resolve(__dirname, "../test.html"), html);
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
    generateHTMLDocument
};
