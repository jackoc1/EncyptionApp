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

    const secretKey = crypto.randomBytes(32).toString('hex');  // Encrypt/decrypt with same secret key for ciphers
    
    
    fs.writeFileSync(path.join(dir, 'public.pem'), publicKey);
    fs.writeFileSync(path.join(dir, 'private.pem'), publicKey);
    fs.writeFileSync(path.join(dir, 'secret_key.txt'), secretKey);
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

const readCipherKeySync = (dir) => {
    try {
        const secret_key = Buffer.from(fs.readFileSync(path.join(dir, 'cipher_keys.json')), 'hex');
    } catch(e) {
        if (e instanceof ENOENT) {
            return undefined;
        } else {
            throw e;
        }
    }

    return secretKey;
}

module.exports = {
    writeKeysSync,
    readSignatureKeysSync,
    readCipherKeySync
};