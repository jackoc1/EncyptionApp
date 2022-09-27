const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const writeKeysSync = (dir) => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {  // Assymetric encryption -> signatures
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

      const secretKey = crypto.randomBytes(32);
      const initVector = crypto.randomBytes(16);
      const cipher_keys = JSON.stringify({
        secretKey,
        initVector
      });
      
      fs.writeFileSync(path.join(dir, 'public.pem'), publicKey);
      fs.writeFileSync(path.join(dir, 'private.pem'), publicKey);
      fs.writeFileSync(path.join(dir, 'cipher_keys.json'), cipher_keys);
};

const readSignatureKeysSync = (dir) => {
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

const readCipherKeysSync = (dir) => {
    try {
        const cipher_keys = JSON.parse(fs.readFileSync(path.join(dir, 'cipher_keys.json')));
    } catch(e) {
        if (e instanceof ENOENT) {
            return undefined;
        } else {
            throw e;
        }
    }

    const secretKey = Buffer.from(cipher_keys.secretKey, 'hex');
    const initVector = Buffer.from(cipher_keys.initVector, 'hex');

    return { secretKey, initVector };
}

module.exports = {
    writeKeysSync,
    readSignatureKeysSync,
    readCipherKeysSync
};