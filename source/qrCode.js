const QRCode = require("qrcode");

const QR_CODE_OPTIONS = {
    type: "image/jpeg",
    rendererOpts: {
        quality: 1.0
    }
};

function decodeQRCodePayload(qrCodeString) {
    const data = JSON.parse(qrCodeString);
    if (!data.type || data.type !== "account-rescue") {
        throw new Error(`Invalid rescue payload: Unrecognised type: ${data.type}`);
    }
    return {
        id: data.id,
        payload: data.payload,
        password: data.password
    };
}

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
    decodeQRCodePayload,
    generateQRCodeForPayload
};
