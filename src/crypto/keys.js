const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const writeKeysSync = (dir) => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {  // Assymetric encryption -> signatures
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem"
        }
    });

    const secretKey = crypto.randomBytes(16).toString('hex');  // Encrypt/decrypt with same secret key for ciphers
    
    
    fs.writeFileSync(path.join(dir, 'public.pem'), publicKey);
    fs.writeFileSync(path.join(dir, 'private.pem'), privateKey);
    fs.writeFileSync(path.join(dir, 'secret_key.txt'), secretKey);
};

const readSignatureKeysSync = (dir) => {
    const publicKeyPem = fs.readFileSync(path.join(dir, 'public.pem'));
    const privateKeyPem = fs.readFileSync(path.join(dir, 'private.pem'));

    const publicKey = crypto.createPublicKey(publicKeyPem);
    const privateKey = crypto.createPrivateKey(privateKeyPem);

    return { publicKey, privateKey };
};

const readCipherKeySync = (dir) => {
    const buffer = fs.readFileSync(path.join(dir, 'secret_key.txt'));
    const secret_key = Buffer.from(buffer.toString(), 'hex');
    return secret_key;
}

module.exports = {
    writeKeysSync,
    readSignatureKeysSync,
    readCipherKeySync
};