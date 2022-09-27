const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const writeKeysSync = (dir) => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });
      
      fs.writeFileSync(path.join(dir, 'public.pem'), publicKey);
      fs.writeFileSync(path.join(dir, 'private.pem'), publicKey);
};

const readKeysSync = (dir) => {
    try {
        const publicKeyPem = fs.readFileSync(path.join(dir, 'public.pem'));
        const privateKeyPem = fs.readFileSync(path.join(dir, 'private.pem'));
    } catch(e) {
        if (e instanceof ENOENT) {
            return undefined;
        } else {
            throw e;
        }
    }

    const publicKey = crypto.createPublicKey(publicKeyPem);
    const privateKey = crypto.createPrivateKey(privateKeyPem);

    return { publicKey, privateKey };
};

module.exports = {
    writeKeysSync,
    readKeysSync
};