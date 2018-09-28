const { decryptPayload, generateSecretPayload } = require("../../source/secret.js");

describe("secret", function() {
    describe("decryptPayload", function() {
        it("can decrypt generated payloads", function() {
            return generateSecretPayload("test")
                .then(data => decryptPayload(data.encryptedPayload, data.password))
                .then(secret => {
                    expect(secret).to.equal("test");
                });
        });
    });

    describe("generateSecretPayload", function() {
        it("generates the correct payload", function() {
            return generateSecretPayload("test").then(data => {
                expect(data).to.have.property("encryptedPayload").that.is.a("string");
                expect(data).to.have.property("password").that.is.a("string");
            });
        });

        it("generates a password of the correct length", function() {
            return generateSecretPayload("test").then(({ password }) => {
                expect(password).to.have.length.above(17);
            });
        });
    });
});
