# 🚨 Account Rescue
> Account reset/rescue framework for NodeJS

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
