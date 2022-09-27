const { json } = require('body-parser');
const crypto = require('crypto');
const path = require('path');
const { decryptJSON } = require('./cipher');
const { readSignatureKeysSync } = require('./keys');

const dir = path.join(__dirname, '../../keys/', process.env.KEYS_DIR);
const algorithm = 'SHA256';

const sign = (data) => {
    const { privateKey } = readSignatureKeysSync(dir);
    const stringified_data = JSON.stringify(data);
    const buffered_data = Buffer.from(stringified_data);

    const signature = crypto.sign(algorithm, buffered_data, privateKey);
    return signature.toString('hex');
}

const verify = (signature, data) => {
    const { publicKey } = readSignatureKeysSync(dir);
    const clear_text = JSON.stringify(decryptJSON(data));
    const buffered_signature = Buffer.from(signature, 'hex');
    return crypto.verify(algorithm, clear_text, publicKey, buffered_signature);
}

module.exports = {
    sign,
    verify
}