const { decodeQRCodePayload, generateQRCodeForPayload } = require("../../source/qrCode.js");

describe("qrCode", function() {
    describe("decodeQRCodePayload", function() {
        it("decodes QR data URIs", function() {
            const data = JSON.stringify({
                id: "123",
                payload: "testpayload",
                password: "test",
                type: "account-rescue"
            });
            const out = decodeQRCodePayload(data);
            expect(out).to.deep.equal({
                id: "123",
                payload: "testpayload",
                password: "test"
            });
        });
    });

    describe("generateQRCodeForPayload", function() {
        it("returns a data URI", function() {
            return generateQRCodeForPayload({ id: "123", payload: "testing", password: "test" })
                .then(dataURI => {
                    expect(dataURI).to.match(/^data:image\/png;base64,/);
                });
        });
    });
});
