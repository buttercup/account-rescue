const QRCode = require("qrcode");

const QR_CODE_OPTIONS = {
    type: "image/jpeg",
    rendererOpts: {
        quality: 1.0
    }
};

function generateQRCodeForPayload({ id, payload, password } = {}) {
    const data = JSON.stringify({
        id,
        payload,
        password,
        type: "account-rescue"
    });
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(data, QR_CODE_OPTIONS, (err, url) => {
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
