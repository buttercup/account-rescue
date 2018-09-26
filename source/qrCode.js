const QRCode = require("qrcode");

function generateQRCodeForPayload({ id, payload, password } = {}) {
    const data = JSON.stringify({
        id,
        payload,
        password,
        type: "account-rescue"
    });
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(data, (err, url) => {
            if (err) {
                return reject(err);
            }
            resolve(url);
        });
    });
}

module.exports = {
    generateQRCodeForPayload
};
