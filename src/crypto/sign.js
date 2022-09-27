const crypto = require('crypto');
const { decryptJSON } = require('./cipher');
const { readSignatureKeysSync } = require('./keys');

const dir = path.join('../../keys/', process.env(KEYS_DIR));
const { publicKey, privateKey } = readSignatureKeysSync(dir);
const algorithm = 'SHA256';

const sign = (json) => {
    const data = Buffer.from(json);
    const signature = crypto.sign(algorithm, data, privateKey);
    return signature;
}

const verify = (signature, data) => {
    const clear_text = decryptJSON(data);
    return crypto.verify(algorithm, clear_text, publicKey, signature);
}

module.exports = {
    sign,
    verify
}