const crypto = require('crypto');
const path = require('path');
const { decryptJSON } = require('./cipher');
const { readSignatureKeysSync } = require('./keys');

const dir = path.join(__dirname, '../../keys/', process.env.KEYS_DIR);
const algorithm = 'SHA256';

const sign = (json) => {
    const { privateKey } = readSignatureKeysSync(dir);
    const data = Buffer.from(json);
    const signature = crypto.sign(algorithm, data, privateKey);
    return signature;
}

const verify = (signature, data) => {
    const { publicKey } = readSignatureKeysSync(dir);
    const clear_text = decryptJSON(data);
    return crypto.verify(algorithm, clear_text, publicKey, signature);
}

module.exports = {
    sign,
    verify
}