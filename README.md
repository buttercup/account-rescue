# 🚨 Account Rescue
> Account reset/rescue framework for NodeJS

[![Build Status](https://travis-ci.org/buttercup/account-rescue.svg?branch=master)](https://travis-ci.org/buttercup/account-rescue)

## About
Account Rescue is a framework designed to make the process of generating _account rescue information_ easier. Such information should provide the web host and its users with enough control and security to implement a basic account retrieval system in the event that a user loses/forgets their password.

The output of this system is a HTML or PDF file that contains information that the user can use to reset their account or simply log in. The output contents are **extremely sensitive** and care should be taken when delivering it to the user.

### Implementation
The framework requires a **user account identifier** and **account secret** (usually an email or account ID and a password). The secret is then encrypted with a _new password_ (randomly generated) and the encrypted result is **split** into _local_ and _remote_ payloads. The remote payload should be stored remotely on the server whereas the local payload is incorporated into the resulting document.

### Disclaimer
No owner, developer or contributor for this repository accept any responsibility for the use or misuse of this framework. It is solely the consumer's responsibility when it comes to using this framework.

## Installation
Install on NodeJS version 8 or newer by running:

```shell
npm install account-rescue --save
```

## Usage
Usage is very simple:

```javascript
const fs = require("fs");
const { renderRescue } = require("account-rescue");

// output a PDF file
renderRescue({ accountIdentifier: "user@hotmail.com", accountSecret: "mySecurePassword", output: "pdf" })
    .then(output => {
        // output contains 'remote' which should be stored on the server and not
        // provided to the user
        fs.writeFileSync("./test.pdf", output.data);
    });

// output a HTML file
renderRescue({ accountIdentifier: "user@hotmail.com", accountSecret: "mySecurePassword", output: "html" })
    .then(output => {
        fs.writeFileSync("./test.html", output.data);
    });
```

You can see an example of the resulting document [here](example.pdf).

### Implementing the rescue protocol
Creating an account rescue feature is an important process for highly-secure systems, and great care should be taken in ensuring the implementation is sound.

This library creates 2 primary deliverables - A **document** which is to be given to the user, and a **remote secret** designed to be stored server-side. The document contains a passphrase and _part_ of an encrypted payload. The other part of the encrypted payload is the remote secret which is not provided to the user and stored on the server.

When this library is charged to create rescue information, the output should be separated immediately, with the remote secret being stored in a database and the rescue document being given to the user in the form of a download.

The document provided allows the user to enter the details in some web or app interface, for recovery, or simply scan the QR code with an app in your suite. An optional `url` parameter can be specified at creation time which is provided in the document - this could be used to help the user navigate to the correct recovery page (it could also include their account ID).

### Performing recovery
In the case that the rescue information needs to be used, the user will provide several data points:

 * Upon scanning their QR code or entering their details manually:
   * Account identifier
   * Passcode
   * Encrypted secret

Use the account identifier to retrieve the _remote_ portion of the payload (this should be done server-side and should **not** be exposed to the user) and call the following method:

```javascript
const { regenerateSecret } = require("account-rescue");

const secret = await regenerateSecret(fetchedRemote, receivedLocal, receivedPassword);
// Secret will be what you stored using `renderRescue` earlier
```

If the user scanned their QR code, the process can be expanded to:

```javascript
const { decodeQRCodePayload, regenerateSecret } = require("account-rescue");

const {
    id,
    payload: local,
    password
} = decodeQRCodePayload(scannedQRDataString);

// fetch remote for `id`

const secret = await regenerateSecret(remote, local, password);
```
